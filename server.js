let express = require('express');
let app = express();
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');
let config = require('./webpack.config');
let compiler = webpack(config);

app.use(middle(compiler))

app.get('/user',function(req,res){
    res.json({name:'sxq'})
})

app.listen(3000)