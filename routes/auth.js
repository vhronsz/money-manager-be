require("dotenv").config();

var express = require("express");
var router = express.Router();
var axios = require("axios");

router.post("/login", async function (req, res, next) {
  const username = req.body.username ? req.body.username : "";
  const password = req.body.password ? req.body.password : "";
  const URL = `${process.env.AUTH_URL}/auth/login`;

  try {
    const response = await axios({
      method: "POST",
      url: URL,
      data: {
        "username": username,
        "password": password
      },
      headers: {
        "Content-Type": "application/json",
        "app_source": "MONEY_MANAGER",
      },
      withCredentials: true
    });

    const cookie = "asd";
    const now = Date.now();
    const cookieExpiration = new Date(now + 1800000);

    return res
      .status(200)
      .cookie("token", cookie, {
        expires: cookieExpiration,
      })
      .json({
        message: response.data.message,
      });

  } catch (err) {
    console.log(err);
    const message = err.response.data.message;
    return res.status(401).json({
      message: message
    })
  }
});

module.exports = router;
