/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import { EventEmitter } from 'node:events';

let capturedHandler: ((...a: any[]) => Promise<void>) | undefined;
let capturedOnsessioninitialized: ((id: string) => void) | undefined;

const mockHandleRequest = jest.fn().mockImplementation(() => Promise.resolve());
const mockClose = jest.fn().mockImplementation(() => Promise.resolve());

let mockTransportInstance: {
  sessionId: string | undefined;
  onclose: (() => void) | null;
  handleRequest: ReturnType<typeof jest.fn>;
  close: ReturnType<typeof jest.fn>;
} | null = null;

jest.unstable_mockModule('@modelcontextprotocol/sdk/server/streamableHttp.js', () => ({
  StreamableHTTPServerTransport: jest.fn().mockImplementation((...args: any[]) => {
    const opts = args[0] as {
      sessionIdGenerator: () => string;
      onsessioninitialized: (id: string) => void;
    };
    capturedOnsessioninitialized = opts.onsessioninitialized;
    mockTransportInstance = {
      sessionId: undefined,
      onclose: null,
      handleRequest: mockHandleRequest,
      close: mockClose,
    };
    return mockTransportInstance;
  }),
}));

jest.unstable_mockModule('../../lib/logger.js', () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockListenFn = jest.fn().mockImplementation((...args: any[]) => {
  const cb = args[1] as () => void;
  cb();
});

const mockHttpServerObj = {
  on: jest.fn().mockReturnThis(),
  listen: mockListenFn,
};

const mockCreateServerFn = jest.fn().mockImplementation((...args: any[]) => {
  capturedHandler = args[0] as (...a: any[]) => Promise<void>;
  return mockHttpServerObj;
});

jest.unstable_mockModule('node:http', () => ({
  createServer: mockCreateServerFn,
}));

const mockConnect = jest.fn().mockImplementation(() => Promise.resolve());
const mockMcpServer = { connect: mockConnect };

const { startHttpServer } = await import('../../lib/http-server.js');

function makeReq(
  method: string,
  path: string,
  headers: Record<string, string> = {},
  body = ''
): unknown {
  const req = new EventEmitter();
  Object.assign(req, { method, url: path, headers });
  setImmediate(() => {
    if (body) req.emit('data', Buffer.from(body));
    req.emit('end');
  });
  return req;
}

function makeRes(): {
  _status: number;
  writeHead: ReturnType<typeof jest.fn>;
  end: ReturnType<typeof jest.fn>;
} {
  const res = {
    _status: 200 as number,
    writeHead: jest.fn().mockImplementation((...args: any[]) => {
      res._status = args[0] as number;
    }),
    end: jest.fn(),
  };
  return res;
}

describe('startHttpServer', () => {
  beforeAll(async () => {
    await startHttpServer(mockMcpServer as any, 4000);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('calls createServer and listens on the configured port', () => {
    expect(mockCreateServerFn).toHaveBeenCalled();
    expect(mockListenFn).toHaveBeenCalledWith(4000, expect.any(Function));
  });

  it('returns 404 for paths other than /mcp', async () => {
    const req = makeReq('GET', '/health');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(404);
  });

  it('returns 405 for unsupported HTTP methods on /mcp', async () => {
    const req = makeReq('PATCH', '/mcp');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(405);
  });

  it('returns 400 for GET /mcp without a valid session header', async () => {
    const req = makeReq('GET', '/mcp');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(400);
  });

  it('returns 404 for DELETE /mcp with unknown session', async () => {
    const req = makeReq('DELETE', '/mcp');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(404);
  });

  it('returns 400 for POST /mcp with invalid JSON body', async () => {
    const req = makeReq('POST', '/mcp', {}, '{ bad json ');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(400);
  });

  it('creates a new MCP session on POST /mcp with valid JSON body', async () => {
    const prevConnectCalls = mockConnect.mock.calls.length;
    const body = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 1, params: {} });
    const req = makeReq('POST', '/mcp', {}, body);
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(mockConnect.mock.calls.length).toBeGreaterThan(prevConnectCalls);
    expect(mockHandleRequest).toHaveBeenCalled();
  });

  it('handles GET /mcp for an existing session', async () => {
    const body = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 2, params: {} });
    const postReq = makeReq('POST', '/mcp', {}, body);
    const postRes = makeRes();
    await capturedHandler!(postReq, postRes);
    capturedOnsessioninitialized?.('session-get-test');

    const getReq = makeReq('GET', '/mcp', { 'mcp-session-id': 'session-get-test' });
    const getRes = makeRes();
    await capturedHandler!(getReq, getRes);
    expect(getRes._status).not.toBe(400);
  });

  it('handles DELETE /mcp for an existing session', async () => {
    const body = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 3, params: {} });
    const postReq = makeReq('POST', '/mcp', {}, body);
    const postRes = makeRes();
    await capturedHandler!(postReq, postRes);
    capturedOnsessioninitialized?.('session-del-test');

    const deleteReq = makeReq('DELETE', '/mcp', { 'mcp-session-id': 'session-del-test' });
    const deleteRes = makeRes();
    await capturedHandler!(deleteReq, deleteRes);
    expect(deleteRes._status).toBe(200);
  });
});
