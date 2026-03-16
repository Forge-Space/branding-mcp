 
import { jest } from '@jest/globals';
import { EventEmitter } from 'node:events';

let capturedHandler: ((...a: any[]) => Promise<void>) | undefined;
let capturedOnsessioninitialized: ((id: string) => void) | undefined;
let capturedSessionIdGenerator: (() => string) | undefined;

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
    capturedSessionIdGenerator = opts.sessionIdGenerator;
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

  it('returns 200 for GET /health', async () => {
    const req = makeReq('GET', '/health');
    const res = makeRes();
    await capturedHandler!(req, res);
    expect(res._status).toBe(200);
  });

  it('returns 404 for unknown paths', async () => {
    const req = makeReq('GET', '/unknown-path');
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

  it('routes POST /mcp to existing session transport when session header matches', async () => {
    // first POST creates a session
    const initBody = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 10, params: {} });
    const initReq = makeReq('POST', '/mcp', {}, initBody);
    const initRes = makeRes();
    mockHandleRequest.mockClear();
    await capturedHandler!(initReq, initRes);
    capturedOnsessioninitialized?.('session-post-existing');

    // second POST with session header routes to the existing transport
    mockHandleRequest.mockClear();
    const body2 = JSON.stringify({ jsonrpc: '2.0', method: 'tools/list', id: 11 });
    const req2 = makeReq('POST', '/mcp', { 'mcp-session-id': 'session-post-existing' }, body2);
    const res2 = makeRes();
    await capturedHandler!(req2, res2);
    expect(mockHandleRequest).toHaveBeenCalled();
  });

  it('sessionIdGenerator returns a UUID string', async () => {
    // A POST will construct a new StreamableHTTPServerTransport and capture the generator
    const body = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 99, params: {} });
    const req = makeReq('POST', '/mcp', {}, body);
    const res = makeRes();
    await capturedHandler!(req, res);
    // Now capturedSessionIdGenerator was set by the constructor mock
    expect(capturedSessionIdGenerator).toBeDefined();
    const id = capturedSessionIdGenerator!();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('triggers onclose callback and removes session from transport map', async () => {
    // POST to create session
    const initBody = JSON.stringify({ jsonrpc: '2.0', method: 'initialize', id: 20, params: {} });
    const initReq = makeReq('POST', '/mcp', {}, initBody);
    const initRes = makeRes();
    await capturedHandler!(initReq, initRes);
    capturedOnsessioninitialized?.('session-onclose-test');
    if (mockTransportInstance) mockTransportInstance.sessionId = 'session-onclose-test';

    // trigger onclose — session should be removed
    if (mockTransportInstance?.onclose) {
      mockTransportInstance.onclose();
    }

    // subsequent GET for the closed session should return 400
    const getReq = makeReq('GET', '/mcp', { 'mcp-session-id': 'session-onclose-test' });
    const getRes = makeRes();
    await capturedHandler!(getReq, getRes);
    expect(getRes._status).toBe(400);
  });
});
