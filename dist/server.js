/**
 * Created by Administrator on 2019/1/9 0009.
 */
var target="http://192.168.10.121:8001"
var proxyTable= {
    '/pc': {
        //  '/api'相当于代表  http://localhost/Graduation_Thesis  可自行修改名字
        target: target, //我们需要请求的主要文件夹地址
        changeOrigin: true, //是否跨域
        pathRewrite:{
            "^/pc":'/pc'
        }
    },
    '/common': {              //  '/api'相当于代表  http://localhost/Graduation_Thesis  可自行修改名字
        target: target, //我们需要请求的主要文件夹地址
        changeOrigin: true, //是否跨域
        pathRewrite:{
            "^/common":'/common'
        }
    },
}
var express = require('express')
var path = require('path')
var fs=require("fs")
var app = express()
var proxyMiddleware = require('http-proxy-middleware')
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    options.onProxyReq=(proxyReq, req, res)=> {
        proxyReq.setHeader('from', '1');
    }
    app.use(context,proxyMiddleware(options.filter || context, options))
})
app.use('/static', express.static(path.join(__dirname, "static")))

app.all('*', function(req, res, next){
    if(req.path=="/index.html" ||req.path=="/index" ){
        res.sendFile( __dirname + "/" + "index.html" );
    }else if(req.path=="/topic.html" || req.path=="/topic" || req.path=="/"){
        res.sendFile( __dirname + "/" + "topic.html" );
    }else if(req.path=="/articleDetail.html" || req.path=="/articleDetail"){
        var title=decodeURIComponent(req.query.title)+"..."
        console.log(title)
        fs.readFile(__dirname + "/" + "articleDetail.html",function(err,data) {
            if (err) {
                res.redirect('/index');
                //throw err.toString();
            } else{
                res.writeHead(200, {"Content-Type": "text/html"});
                var data1=data.toString().replace(`<title>微淘米</title>`, `<title>`+title+`-微淘米，没什么比开心更重要！</title>`)
                res.end(data1);
            }
        })
        // res.sendFile( __dirname + "/" + "articleDetail.html");
    }else if(req.path=="/topicdetail.html" || req.path=="/topicdetail"){
        var title=decodeURIComponent(req.query.topicTitle)+"..."
        fs.readFile(__dirname + "/" + "topicdetail.html",function  (err,data) {
            if (err) {
                res.redirect('/');
               // throw err.toString();
            } else{
                res.writeHead(200, {"Content-Type": "text/html"});
                var data1=data.toString().replace(`<title>微淘米</title>`, `<title>`+title+`-微淘米，没什么比开心更重要！</title>`)
                res.end(data1);
            }
        })
       // res.sendFile( __dirname + "/" + "topicdetail.html" );
    }else{
        var title=req.params
        console.log(title)
        req.headers['from'] = '1'
        next()
    }
})
var server = app.listen("8088",function(){
    console.log("service is start");
})

