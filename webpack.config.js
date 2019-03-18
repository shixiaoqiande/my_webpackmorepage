let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    mode:"production",
    entry:{
        home:"./src/index.js",
        a:"./src/a.js"
    },
    output:{
        filename:"[name][hash:6].js",
        path:path.resolve(__dirname,'dist')
    },
    devServer:{
        // proxy:{
        //     "/api":{
        //         target:"http://localhost:3000",
        //         pathRewrite:{'/api':''}
        //     }
        // }
        before(app){
            app.get('/user',function(req,res){
                res.json({name:"wzy"})
            })
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            chunks:['home']
        }),
        new HtmlWebpackPlugin({
            template:"./src/a.html",
            filename:"a.html",
            chunks:['a']
        }),
        new CleanWebpackPlugin('./dist'),
        new CopyWebpackPlugin([
            {from:'img',to:"../src/img"}
        ]),
        new webpack.BannerPlugin('made in sxq')
    ],
    devtool:"source-map"
}