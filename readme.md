## webpack 配置

## 打包多页应用
- 完成基础配置

- 在 src 下建 a.js a.html index.js index.html （名字随意）

- 在 webpack.config.js 中配置
    entry 配置为对象形式
```
    entry:{
        home:"./src/index.js",
        a:"./src/a.js"
    }
```
    output 出口文件名修改为
```
    filename:"[name].html"
```

- 下载 html-webpack-plugin 插件
    yarn add html-webpack-plugin -D
    在 plugins 中配置
```
    # chunks 保证html引入对应的js文件 数组内设置哪个就引入哪个 都设置就都引入 不设置默认都引入
    let HtmlWebpackPlugin = require('html-webpack-plugin');
    # 在plugins内
    new HtmlWebpackPlugin({
        template:"./src/index.html",
        filename:"index.html",
        chunks:['home'] 
    })
    new HtmlWebpackPlugin({
        template:"./src/a.html",
        filename:"a.html",
        chunks:["a"] 
    })
```

## 配置 source-map 源码映射
```
    # 与 mode 同级
    devtool:"source-map"
```
- source-map 会单独生成一个 sourcemap 文件 可以帮我们调试源代码 大而全 会显示当前报错的列和行

- eval-source-map 不会生成单独的文件 但会显示报错的列和行

- cheap-module-source-map 不会产生列 但是是一个单独的文件

- cheap-module-eval-source-map 不会产生列也不会产生文件 会直接集成在文件里

## 实时编译
watch: true
- 监控的选项
```
    watchOptions:{
        poll: 1000,// 每秒访问多少次
        aggreatmentTimeout: 500, // 防抖 （一直输入代码）
        ignored: /node_modules/ // 忽略监控文件
    }
```

## webpack 常用插件
- clean-webpack-plugin 清除缓存
    yarn add clean-webpack-plugin -D
```
    let CleanWebpackPlugin = require('clean-webpack-plugin');
    # 在plugins内
    new CleanWebpackPlugin('./dist') // 要清缓存的路径文件
```

- copy-webpack-plugin 拷贝
    yarn add copy-webpack-plugin -D
```
    let CopyWebpackPlugin = require('copy-webpack-plugin');
    # 在plugins内
    new CopyWebpackPlugin([
        {
            from:'img', // 要拷贝的文件
            to:'./img' // 拷贝地址默认为 dist 文件
        }
    ])
```

## webpack 跨域
- 新建 server.js 文件 搭建后台环境
```
    let express = require('express');
    let app = express();

    app.get('/user',function(req,res){
        res.json({name:'sxq'})
    })

    app.listen(3000)
```
- 在 index.js 写一个请求
```
    let xhr = new XMLHttpRequest();
    xhr.open('get','/api/user',true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.status==200&&xhr.readyState==4){
            let result = xhr.responseText
            console.log(result)
        }
    }
```
- proxy 代理跨域 
    - target 访问 http://localhost:3000 等于访问 /api
    - pathRewrite 重写路径 /api/user 等于访问 http://localhost:3000/user
```
    # (webpack.config.js)
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                pathRewrite:{'/api':''}
            }
        }
    }

    # (index.js)
    xhr.open('get','/api/user',true);
```

- 前端单纯的模拟数据
```
    # (webpack.config.js)
    devServer:{
        before(app){
            app.get('/user',function(req,res){
                res.json({name:"wzy"})
            })
        }
    }

    # (index.js)
    xhr.open('get','/user',true);
```

- 在服务器端启动webpack端口 只在 node 里使用
    需要下载 webpack-dev-middleware -D
        yarn add webpack-dev-middleware -D
```
    # (server.js 代码添加)
    let webpack = require('webpack');
    let middle = require('webpack-dev-middleware');
    let config = require('./webpack.config.js');
    let compiler = webpack(config);
    app.use(middle(compiler));
    
```
- webpack-dev-middleware 作用
    生成一个 与 webpack 的 compiler 绑定的中间件
