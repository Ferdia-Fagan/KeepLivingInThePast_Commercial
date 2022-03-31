console.log("hello")

module.exports = {
    modulePaths: ["node_modules", "<rootDir>/src/*"],
    transform: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/fileTransformer.js',
        '^.+\\.ts?$': 'ts-jest'
    },
    preset: "ts-jest",
    testEnvironment: 'node',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ["./tests/SetupTests.test.ts"]
    // transform: {
    //     ".+\\.ts$": "ts-jest",
    // },
    // testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.ts$",
    // moduleFileExtensions: ["ts", "js"],
    // setupFilesAfterEnv: ["./tests/SetupTests.test.ts"],
};