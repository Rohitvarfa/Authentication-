var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users.js')

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/profile", isLoggedIn , function(req,res){
  res.render('profile');
});

//register user
router.post("/register",function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    secret:req.body.secret
  });
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    })
  })
});

// login user
router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}), function (req,res){});


//logout function
router.get("/logout",function(req,res,next){
req.logout(function(err){
  if (err) { return next(err); }
  res.redirect('/');
});
});

//isLoggedIn

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

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
