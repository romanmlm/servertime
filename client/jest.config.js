// The root of your source code, typically /src
// `<rootDir>` is a token Jest substitutes
export const roots = ['<rootDir>/src'];

// Jest transformations -- this adds support for TypeScript
// using ts-jest
export const preset = 'ts-jest';

// Jest transformations -- this adds support for TypeScript
// using ts-jest
export const transform = {
  '^.+\\.js$': 'babel-jest',
  '^.+\\.(ts|tsx)$': 'ts-jest'
};

// Runs special logic, such as cleaning up components
// when using React Testing Library and adds special
// extended assertions to Jest
/*  setupFilesAfterEnv: [
         "@testing-library/react/cleanup-after-each",
         "@testing-library/jest-dom/extend-expect"
     ], */

// Test spec file resolution pattern
// Matches parent folder `__tests__` and filename
// should contain `test` or `spec`.
export const testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$';

// Module file extensions for importing
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];
export const modulePaths = ['<rootDir>/src'];
