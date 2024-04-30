var express = require('express');
var router = express.Router();

var UserRepository = require("../repository/users_repository");
var ResponseDto = require("../dto/responseDto");

router.post("/login", function (req, res, next) {
    let isAuthenticated = false;
    let response = new ResponseDto();

    const username = req.body.username;
    const password = req.body.password;

    response.type = "SUCCESS";
    response.message = "Login Success";
    response.data = {};
    return res.json({
        ...response
    })
});

module.exports = router;