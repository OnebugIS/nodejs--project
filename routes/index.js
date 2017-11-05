var express = require('express');
var router = express.Router();


//首页引入article数据库
var Article=require("../model/article");//适合article共用一个数据库
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

// 拿到cook值显示在Index
  // res.render('index', { title: 'Express',name:req.cookies["currentUser"] });

  //session
  if (req.session.chenzhenInfo) {//也就是session有效 也就是用户登录成功 （）回到index

    Article.find({//当找到登录作者的姓名时才进行登录 而不是谁都可以对文章进行操作
      author:req.session.chenzhenInfo["name"]
    }).then(result=>{
        // res.render('index', { title: 'Express',name:req.cookies["currentUser"] });再加一下对文章列表的模板
        res.render('index', { title: 'Express',name:req.cookies["currentUser"] ,list:result})
    })

  	
  } else {
  	res.redirect("/login");//重定向到登录
  }

});


//销毁session  
//点击注销后跳转至此 
router.get("/logout",function (req,res) {
	req.session.destroy(()=>{//session.destroy方法 销毁session
		res.redirect("/login");//重定向到login
	})
})


//主页个人信息
router.get('/resume', function(req, res, next) {
  res.render('resume', { title: '主页',isShow:false });
});


//已发表文章list
router.get('/list', function(req, res, next) {
  res.render('list', { title: '主页',isShow:false });
});



module.exports = router;
