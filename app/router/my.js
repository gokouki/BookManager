// 定义个人中心相关的路由
var router = require('express').Router();
// 引入文件系统
var fs = require('fs');

// 订单提交
router.get('/orderSubmit',function(req,res){
    // 判断是否已有该用户的订单文件
    fs.exists('./text/order' + req.query.id + '.json',function(isOK){
        if(isOK){
            console.log(isOK)
            // 读取文件
            fs.readFile('./text/order' + req.query.id + '.json',function(err,data){
                if(err){
                    //错误信息
                }else{
                    var orders = JSON.parse(data);
                    // 获取当前时间
                    var n = new Date().getFullYear(); //年
                    var y = new Date().getMinutes() + 1; //月
                    var r = new Date().getDate(); //日
                    var h = new Date().getHours(); //时
                    var m = new Date().getMonth(); //分
                    var time = n + '年' + y + '月' + r + '日' + ' ' + h + '时' + m + '分';
                    var cart = {
                        time:time,
                        data:req.query.cart,
                        sum:req.query.sum
                    }
                    orders.unshift(cart);
                    var data = JSON.stringify(orders)
                    // console.log(data)
                    // 写入文件
                    fs.writeFile('./text/order' + req.query.id + '.json',data,function(err){
                        if(err){
                            //错误信息
                        }else{
                            res.json({code:1,data:'提交成功'})
                        }
                    })
                }
            })

        }else{
            //还未提交过订单
            var orders = []
            // 获取当前时间
            var n = new Date().getFullYear(); //年
            var y = new Date().getMinutes() + 1; //月
            var r = new Date().getDate(); //日
            var h = new Date().getHours(); //时
            var m = new Date().getMonth(); //分
            var time = n + '年' + y + '月' + r + '日' + ' ' + h + '时' + m + '分';
            // console.log(time);
            var cart = {
                time:time,
                data:req.query.cart,
                sum:req.query.sum
            }
            orders.unshift(cart);
            var data = JSON.stringify(orders)
            // 写入文件
            fs.writeFile('./text/order' + req.query.id + '.json',data,function(err){
                if(err){
                    //错误信息
                }else{
                    res.json({code:1,data:'提交成功'})
                }
            })
        }
    })
})


// 获取用户订单
router.get('/getOrder',function(req,res){
    console.log(req.query.id)
    // 判断用户是否有订单
    fs.exists('./text/order' + req.query.id + '.json',function(isOK){
        if(isOK){
            // 读取文件
            fs.readFile('./text/order' + req.query.id + '.json',function(err,data){
                // 获取订单信息
                var data = JSON.parse(data);
                // 将订单信息返回给前台
                res.json({code:1,data:data});
            })
        }else{
            //无订单
        }
    })



})





module.exports = router;