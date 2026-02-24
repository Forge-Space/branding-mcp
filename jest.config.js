/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  testTimeout: 15_000,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    '!src/lib/config.ts',
    '!src/lib/logger.ts',
    '!src/lib/branding-core/documents/**',
    '!src/lib/branding-core/validators/token-schema.ts',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
