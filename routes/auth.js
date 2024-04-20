var express = require('express');
var router = express.Router();

router.post("/login", function (req, res, next) {
    let userAuthorized = false;
    const username = req.body.username;
    const password = req.body.password;
    // terjadi validasi disini
    if (username === "iniRyan" && password === "iniPasswordnyaRyan") {
        //Sending correct response
        userAuthorized = true;
    }
    if (!userAuthorized) {
        res.status(400).json({
            type: "error",
            response: {
                message: "Not Authorized"
            }
        });
    } else {
        res.status(200).json({
            type: "success",
            response: {
                message: "Login Success",
                user: { name: "admin", role: ["admin"], scope: [""] }
            }
        });
    }
});

module.exports = router;