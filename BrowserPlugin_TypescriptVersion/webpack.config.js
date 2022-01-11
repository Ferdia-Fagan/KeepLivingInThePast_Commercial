const path = require('path');

module.exports = {
    entry: {
        'background-script': './src/TS/background/browser_state_management/BrowserStateManager.ts',
    },
    output: {
        path: path.resolve(__dirname, 'extension/src'),
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        // modules: [ path.join(__dirname, './src') ]
    },
    module: {
        rules: [
            // {enforce: 'pre', test: /\.tsx?$/, loader: 'tslint-loader'},
            // {tests: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
        ]
    },
};