module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/pkg'],
  modulePathIgnorePatterns: ['<rootDir>/pkg'],
}
