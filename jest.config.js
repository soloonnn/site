module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/" 
  ],
  moduleDirectories: ['node_modules', 'src'],
};