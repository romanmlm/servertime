module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/api$1',
    '^@data(.*)$': '<rootDir>/src/data$1',
    '^@gc-apollo(.*)$': '<rootDir>/src/apollo$1'
  },
  reporters: ['default', 'jest-stare'],
  testResultsProcessor: './node_modules/jest-stare'
};
