var express = require('express');
var router = express.Router();

router.get("/", function(req,res,next){
    console.log(req);
    res.send("testing");
});


router.post("/login", function(req,res,next){
    console.log(req.body);
    res.send("Logged in");
});


module.exports = router;