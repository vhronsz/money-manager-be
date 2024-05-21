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

        if (response.data.type === "SUCCESS") {
            const cookie = response.data.data.token
            const now = Date.now();
            const cookieExpiration = new Date(now + 1800000);
            return res.cookie(
                "token",
                cookie,
                {
                    expires: cookieExpiration
                }
            ).json(
                {
                    "type": response.data.type,
                    "message": response.data.message
                }
            );
        }

        return res.json({
            "type": response.data.type,
            "message": response.data.message

        })
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;