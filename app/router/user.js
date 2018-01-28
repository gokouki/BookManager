
// 定义用户相关的路由
var router = require('express').Router();

// 引入文件系统
var fs = require('fs');

// 注册接口
router.post('/register',function(req,res){
    // console.log(req.body);
    // 判断用户注册信息表是否存在
    fs.exists('./text/user.json',function(isOK){
        if(isOK){
            // 注册信息表存在时 读取里面的文件信息
            fs.readFile('./text/user.json',function(err,data){
                    if(err){
                        //错误提示
                    }else{
                        // console.log(data);
                        // 将字符串信息转换成对象
                        var data = JSON.parse(data);
                        // 查找当前账号是否已经存在于注册信息了
                        var index = data.findIndex(function(item){
                            return req.body.account === item.account
                        })
                        // 判断index 如果大于-1表示信息已经存在
                        if(index > -1){
                            //账号已存在
                            res.json({code:2,data:'账号信息已存在'});        
                        }else{
                            //账号可以注册
                            data.push(req.body);
                            var data = JSON.stringify(data);
                            fs.writeFile('./text/user.json',data,function(err){
                                if(err){
                                    //错误信息
                                }else{
                                    res.json({code:1,data:'注册成功'});
                                }
                            })
                        }

                    }
            })

        }else{
            // 当信息表不存在时,建信息表,并写入数据
            var arr = [];
            // 把用户信息添加进去
            arr.push(req.body);
            // 将数组内容转化成JSON字符串,用于写入文件系统
            var data = JSON.stringify(arr);
            // 将数据写入文件系统
            fs.writeFile('./text/user.json',data,function(err){
                if(err){
                    //错误提示
                }else{
                    res.json({code:1,data:'注册成功'});
                }
            })
        }
    })
})

// 登入接口
    router.post('/login',function(req,res){
        console.log(req.body);  
        // 判断用户信息表是否存在
        fs.exists('./text/user.json',function(isOK){
            if(isOK){
                // 用户信息表如果存在则读取文件
                fs.readFile('./text/user.json',function(err,data){
                    if(err){
                        // 错误信息
                    }else{
                        // 读取成功
                        var data = JSON.parse(data);
                        // 判断用户信息是否存在
                        var index = data.findIndex(function(item){
                            return item.account === req.body.account
                        })                    
                        if(index > -1){
                            //用户存在则判断密码是否正确
                            if(data[index].password === req.body.password){
                                // 密码正确
                                res.json({code:1,data:'登入成功'})
                            }else{
                                // 密码错误
                                res.json({code:2,data:'密码错误'})
                            }
                        }else{
                            res.json({code:2,data:'用户名不存在'})
                        }
                    }
                })

            }else{
                res.json({code:2,data:'用户名不存在'})
            }
        })
    })





// 输入路由端口
module.exports = router;

