const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const Source = "./src/main";
const buildLocation = "extension/build";

const Background = path.join(Source, "background/application");
const Content = path.join(Source, "view/concrete/content_script/application");
const Popup = path.join(Source, "view/concrete/popup/application");
const Sidebar = path.join(Source, "view/concrete/sidebar/application");

const config = {
    entry: {
        background: "./" + Background + "/App.ts",
        popup: "./" + Popup + "/App.tsx",
        content: "./" + Content + "/App.tsx",
        sidebar: "./" + Sidebar + "/App.tsx",
    },
    output: {
        path: path.join(__dirname, buildLocation),
        filename: "[name].js",
        library: 'extension'
    },

    devtool: "source-map",

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },

                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                }
            },
        ],
    },
    plugins: [

    ],
    resolve: {
        modules: ['./src', './node_modules'],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            background: Background,
            content: Content,
            popup: Popup,

            "preact": "preact",
            "react": "preact-compat",
            "react-dom": "preact-compat"
        },
    },
    optimization: {
    }
};

module.exports = {
    ...config
};
