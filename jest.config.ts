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
  setupFiles: ['jest-date-mock', '<rootDir>/src/jest/jest-shim.js'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/jest.setup.js'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/node_modules', '<rootDir>/public', '<rootDir>/dist/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'sonarqube-report/',
        outputName: 'sonarqube-report.xml',
        reportedFilePath: 'absolute'
      }
    ]
  ],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '^antd/es/(.*)$': '<rootDir>/node_modules/antd/lib/$1'
  },
  snapshotResolver: '<rootDir>/src/jest/jest.snapshot.js',
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true
}

export default createJestConfig(customJestConfig)
