var express = require('express');
var router = express.Router();
var axios = require("axios");

///
var UserRepository = require("../repository/users_repository");
var ResponseDto = require("../dto/responseDto");


router.post("/login", async function (req, res, next) {

    try{
    let isAuthenticated = false;
    let response = new ResponseDto();

    const username = req.body.username;
    const password = req.body.password;

    const user = await axios.post(
        "http://localhost:9200/auth/login",
        {
            username: username,
            password: password
        }
    );


    if (isAuthenticated) {
        response.type = "SUCCESS";
        response.message = "Login Success";
        response.data = {};
        return res.json(json)
    }
    }catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;