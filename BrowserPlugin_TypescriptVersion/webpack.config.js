const path = require('path');

const keysTransformer = require('ts-transformer-keys/transformer').default;

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
            {
                test: /\.ts$/,
                loader: 'ts-loader', // or 'awesome-typescript-loader'
                options: {
                    // make sure not to set `transpileOnly: true` here, otherwise it will not work
                    getCustomTransformers: program => ({
                        before: [
                            keysTransformer(program)
                        ]
                    })
                }
            }
            // {enforce: 'pre', test: /\.tsx?$/, loader: 'tslint-loader'},
            // {tests: /\.tsx?$/, loader: 'awesome-typescript-loader'},
            // {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
        ]
    },
};