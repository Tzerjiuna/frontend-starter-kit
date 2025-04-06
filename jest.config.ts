import type { Config } from 'jest'
import nextJest from 'next/jest'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig: Config = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: process.env.CI ? ['lcov'] : ['json', 'lcov', 'html', 'text'],
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest/jest.setup.ts'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  modulePathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/node_modules', '<rootDir>/public', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
    '!src/types/**/*',
    '!src/**/mock*.{js,jsx,ts,tsx}'
  ],
  reporters: ['default', 'jest-sonar'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^antd/es/(.*)$': '<rootDir>/node_modules/antd/lib/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotResolver: '<rootDir>/src/tests/jest/jest.snapshot.js',
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  clearMocks: true
}

export default createJestConfig(customJestConfig)
