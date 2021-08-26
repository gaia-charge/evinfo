/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(ts|js)$": "ts-jest"
    // "^.+\\.svelte$": [
    //   "svelte-jester",
    //   {
    //     "preprocess": true
    //   }
    // ],
  },
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ]
}
