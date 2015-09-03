/**
 * Created by vyt on 2015-07-26.
 */
module.exports = {
    entry: __dirname + "/dev/jsx/main.jsx",
    output: {
        filename: __dirname + "/public/javascripts/mainbundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: "style!css!autoprefixer-loader!sass"
            },
            {
                test: /\.js.*$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }]
    }
};
