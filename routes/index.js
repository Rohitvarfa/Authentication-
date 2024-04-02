var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/failed',function(req,res){
  req.flash("age",12);
  req.flash("name","Rohit");
  res.send("bangaya");
});

router.get('/checkkro',function(req,res){
  console.log(req.flash("age"));
  console.log(req.flash("name"));
  res.send("check kr lo backend ke terminal pe");
});


module.exports = router;
