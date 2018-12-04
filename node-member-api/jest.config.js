// Needed to specify which files Jest needs to test

module.exports = {
    // Glueing environment, scripting files, and tests together!
    displayName: "server",
    testRegex: "./server/__tests__\/.*\.test\.js$" // Used to find test files, otherwise tries to run everything in __tests__ folder
}