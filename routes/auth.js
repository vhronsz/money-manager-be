require("dotenv").config();

var ResponseDto = require("../dto/responseDto");
var express = require("express");
var router = express.Router();
var axios = require("axios");

router.post("/login", async function (req, res, next) {
  const response = new ResponseDto();

  const username = req.body.username ? req.body.username : "";
  const password = req.body.password ? req.body.password : "";
  const URL = `${process.env.AUTH_URL}/auth/login`;

  try {
    const loginResponse = await axios({
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

    const cookie = response.data.data;
    const now = Date.now();
    const cookieExpiration = new Date(now + 1800000);
    
    response.ok = true;
    response.data = cookie;
    response.message = response.data.message;
    
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
    response.ok = false;
    response.message = err.response.data.message;

    return res.status(401).json(response);
  }
});

module.exports = router;
