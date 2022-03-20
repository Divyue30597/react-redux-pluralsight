const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //There are a number of dev tools to consider, but this one is generally recommended for development so that we get a source map for debugging. source maps let us see our original code in the browser. Because we're going to transpile our code with Babel, source maps will let us see the original code that we wrote when we view it in the browser.
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"), // we can declare where we want webpack to output. Now this is a little bit strange because webpack doesn't output code in development mode. It merely puts it in memory. However, we do have to declare these paths so that it knows where it's serving from memory.
    publicPath: "/",
    filename: "bundle.js",
  },
  // We're going to use webpack to serve our app in development too, so we're going to configure the devServer right here.
  devServer: {
    stats: "minimal", // This reduces the information that it writes to the command line
    overlay: true, // overlay any errors that occur in the browser
    historyApiFallback: true, // this means that all requests will be sent to index.html
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  plugins: [
    // For plugins, you specify an array. We're going to tell the plugin where to find our HTML template, which is in the src directory in index.html, and also tell it where to find our favicon, which is in that same directory.
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    // We tell webpack what files we want it to handle, and we do that by declaring an array of rules
    rules: [
      {
        // The first rule is going to be for our JavaScript, so we will tell it how to find our JavaScript files.
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, // ignore node_modules
        use: ["babel-loader", "eslint-loader"], // to run Babel on these files, we will call babel‑loader. So, this little snippet of code will run Babel on all of our JavaScript and webpack will bundle that up for us. These rules work in bottom up approach i.e., run eslint-loader first then babel-loader.
      },
      // Webpack understands a lot more than JavaScript. We can also have it process our CSS.
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
