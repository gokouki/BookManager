// 定义书籍相关的路由
var router = require("express").Router()
var fs = require("fs")

//获取书籍列表信息
router.get("/list",function(req,res){
    // 获取书籍信息
    var type=req.query.type
    // console.log(type)
    // 读取对应的书籍信息
    fs.readFile("./text/book_"+type+'.json',function(err,data){
        if(err){
            //错误信息
        }
        else{
            var data = JSON.parse(data)
            res.json({code:1,data:data})
        }
    })
})

// 获取书籍详细信息
router.get('/detail',function(req,res){
    fs.readFile('./text/book_' + req.query.type + '.json',function(err,data){
        if(err){ 
            //错误提示
        }else{
            var data = JSON.parse(data);
            // 获取匹配的书籍信息
            var book = data.find(function(item){
                return item.id == req.query.id
            });
            res.json({code:1,data:book});
        }            
    })
})
// 模块输出
module.exports = router