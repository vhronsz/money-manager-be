require("dotenv").config();

var express = require('express');
var router = express.Router();
var axios = require("axios");

router.post("/login", async function (req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const URL = `${process.env.AUTH_URL}/auth/login`;
        const response = await axios.post(
            URL,
            {
                username: username,
                password: password
            }
        )
        return res.json(response.data);
    } catch (err) {
        console.log(err);
        next(err);
    }
}); 

module.exports = router;