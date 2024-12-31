module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  // preset: "ts-jest",
  // resolver: "ts-jest-resolver",
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'js'],
};