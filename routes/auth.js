var express = require('express');
var router = express.Router();

router.get("/", function(req,res,next){
    const username = req.params.username;
    const password = req.params.password;
    console.log({username, password});
    res.send("testing");
});

router.post("/login", function(req,res,next){
    console.log(req.body);
    res.send("Logged in");
});

module.exports = router;