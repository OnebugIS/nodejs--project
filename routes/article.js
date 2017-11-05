// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.render('article', { title: '发表页面',isShow:false});
// });


// router.post("/",function (req,res) {
// 	console.log(req.body);//路由接收浏览器信息给后台 此时会将发表页面内容打印在控制台
// })


// module.exports = router;


// 一下代码为操作数据库模型article
var express = require('express');
var router = express.Router();

var Article=require("../model/article");

//--------配置multer，设置存储路径以及文件名字---------------
//
//
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/chenzhenphoto");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })







router.get('/', function(req, res, next) {
  res.render('article', { title: '发表页面',isShow:false,isNew:true});
});

router.post("/",upload.single('chenzhenphoto'),function (req,res) {
	console.log(req.file);//路由接收浏览器信息给后台 此时会将发表页面内容打印在控制台

	Article.create({
		//将姓名 定义在创建的表格author中
		author:req.session.chenzhenInfo["name"],// 第一种解决
		// author:req.cookies["currentUser"],//第二种解决
		title:req.body.title,
		abstract:req.body.abstract,
		content:req.body.content,
		pathname:`/chenzhenphoto/${req.file.filename}`//将图片路径存放在数据库
	}).then(result=>{//发表成功后跳转到index页面
		res.redirect("/");
	})




})



router.get("/fixed",function(req,res){

	Article.find({
		_id:req.query.id
	}).then(result=>{
		res.render('article', { title: '更新页面',isShow:false,isNew:false,info:result[0] });
	})
	
})


router.post("/fixed",function(req,res){
	console.log(req.body);
	Article.findByIdAndUpdate(req.body.id,{$set:{title:req.body.title,abstract:req.body.abstract,content:req.body.content}}).then(result=>{

		res.redirect("/");
	})
})


//删除的操作
router.get("/delete",function(req,res){
	Article.findByIdAndRemove(req.query.id).then(result=>{
		res.redirect("/");
	})
})

module.exports = router;