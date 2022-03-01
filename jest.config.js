/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "json", "ts"],
  transform: {
    "^.+\\.(tsx|config.js|setup.js)?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/src/**/*.spec.ts"],
  testURL: "http://localhost/",
  clearMocks: true,
};

module.exports = config;