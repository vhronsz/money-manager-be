var express = require('express');
var router = express.Router();
var axios = require("axios");

///
var UserRepository = require("../repository/users_repository");
var ResponseDto = require("../dto/responseDto");


router.post("/login", async function (req, res, next) {

    let isAuthenticated = false;
    let response = new ResponseDto();

    const username = req.body.username;
    const password = req.body.password;

    axios.post(
        "http://localhost:9200/auth/login",
        {
            username: username,
            password: password
        }
    ).then(
        (res) => {
            console.log(res)
        }
    ).catch(
        (err) => {
            next(err)
        }
    );


    if (isAuthenticated) {
        response.type = "SUCCESS";
        response.message = "Login Success";
        response.data = {};
        return res.json(json)
    }

});

module.exports = router;