var express = require('express');
var router = express.Router();

router.get("/", function(req,res,next){
    res.json({
        type: "debug",
        response: {
            message: "testing /"
        }
    });
});

router.post("/login", function(req,res,next){
    const userAuthorized = false;
    const username = req.params.username;
    const password = req.params.password;
    if(username === "iniRyan" && password === "iniPasswordnyaRyan"){
        //Sending correct response
        userAuthorized = true;
    }
    if(!userAuthorized){
        res.json({
            type: "error",
            response: {
                message: "Not Authorized"
            }
        }, 400)
    }else{
        res.json({
            type:"success",
            response:{
                message: "Login Success",
                user: {name: "admin", role: ["admin"], scope: [""]}
            }
        })
    }
});

module.exports = router;