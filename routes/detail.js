var express = require('express');
var router = express.Router();
var Article = require("../model/article");
/* GET home page. */
router.get('/', function(req, res, next) {

  	Article.find({
  		_id:req.query.id
  	}).then(result=>{
  		// console.log(result);
  		res.render('detail', { title: '详情页面',isShow:false,info:result[0] });
  	})
  
});
   
module.exports = router;
