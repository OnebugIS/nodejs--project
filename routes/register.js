var express = require('express');
var router = express.Router();


var User=require("../model/user");//引入model。user文件


var md5=require("md5");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '主页',isShow:false });
});



router.post('/',function (req,res) {
	// console.log(req.body);


User.find({
  	email:req.body.email//查询有没有同名的邮箱
  }).then(result=>{//如果有打印[] 如果没有打印出来
  	if (result.length==0) { //没有重名的情况下 插入数据
  		return User.create({//name这些要跟user.js里的相对应
		  	name:req.body.username,
		  	tel:req.body.tel,
		  	email:req.body.email,
		  	// password:req.body.password
        password:md5(req.body.password)//引用md5模块 对注册密码进行加密处理 
	  })
  	} else {
  		res.render('register', {title:"注册页面",isShow:true})//如果邮箱重复

  	}
  }).then(result=>{
  	//这个回调函数等待create的promise reslove之后才会调用
  	res.redirect("/login");//邮箱没有被注册则进行跳转到 登录页面
  })
})
module.exports = router;