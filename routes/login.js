var express = require('express');
var router = express.Router();
var User=require("../model/user");//引入model。user文件

var md5=require("md5");//注册进行了md5加密 登录也应该用md5解密后进行登录
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '登录页面',isShow:false});//此路由链接login。ejs路由 不同路径显示不同内容
});


//对login.js传过来的数据进行处理 
//路由可以简单理解为分发和接收处理数据
router.post("/",function (req,res) {//用post处理数据

	 User.find({//如果找到重名的 数据库 在注册数据中进行find
	 	tel:req.body.tel,
	 	email:req.body.email,
	 	password:md5(req.body.password)//用md5模块进行登录


	 }).then(result=>{//如果重名在控制台打印 如果没有则打印空数组
	 	// console.log(result);
	 	if (result==0) { //也就是数组为0 意思是没有注册信息
	 		res.render('login', {title:'登录页面',isShow:true})
	 	} else {
	 		// 将名字以cook的形式进行存在浏览器 也可以选择从数据库去取  但是这样方便
	 		// 1.先将登录的name值 以变量currentUser进行存储在cook
	 		// 2.在index.js中name:req.cookies["currentUser"] 获取到index页面
	 		// 3.在index.ejs中
	 		// 4.在header.ejs的模板中
	 		// res.cookie("currentUser",result[0].name);


	 		// 使用app.js的session模块
	 		// req.session对应cook钥匙 在路由上对后端的session房间进行存值  result[0]是登录的对象 使得session变得有效 否则只是开辟空间没有效果 就不能登录后使用index
	 		// key value值
	 		// 还要进行处理 不能所有人都进入页面
	 		
	 		
	 		// 登录成功后才会走一下分支 接着走index.js分支
	 		// req.session.chenzhenInfo=result[0]; //一个等于号

	 		req.session.chenzhenInfo=result[0];//拿到cook值

	 		res.cookie("currentUser",result[0].name);

	 		res.redirect("/");
	 	}
	 		



	 })



})



module.exports = router;