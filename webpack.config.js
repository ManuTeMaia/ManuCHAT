// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "chat.bundle.js",
        publicPath: "/",
    },
    devServer: {
        open: false,
        host: "localhost",
        port: "3000",
        historyApiFallback: true,
        magicHtml: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "static/index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.p?css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"],
            },
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext]"
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext]"
                }
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "handlebars": "handlebars/dist/handlebars.min.js"
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
        
    } else {
        config.mode = "development";
    }
    return config;
};
