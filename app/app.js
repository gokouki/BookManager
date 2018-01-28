// 引入express框架
var express = require('express');
// 实例化一个对象
var app = express();
//创建静态资源目录
app.use(express.static('src')); 

// 引入body-parser插件
var bodyParser = require('body-parser');

// 序列化form表单的数据
app.use(bodyParser.urlencoded({extended:true}));

// 引入用户路由文件
app.use('/user',require('./router/user'));

// 引入书籍路由文件
app.use('/book',require('./router/book'))

// 个人中心路由文件
app.use('/my',require('./router/my'))

// 在4000端口启动服务器
app.listen(4000,function(){
    console.log('4000端口服务器已经启动');
})

