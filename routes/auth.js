require("dotenv").config();

var express = require("express");
var router = express.Router();
var axios = require("axios");

router.post("/login", async function (req, res, next) {
  const username = req.body.username ? req.body.username : "";
  const password = req.body.password ? req.body.password : "";
  const URL = `${process.env.AUTH_URL}/auth/login`;

  try {
    const response = await axios.post(
      URL,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          app_source: "MONEY_MANAGER",
        },
      }
    );


    console.log("asdsd");

    const cookie = response.data.data.token;
    const now = Date.now();
    const cookieExpiration = new Date(now + 1800000);

    return res
      .cookie("token", cookie, {
        expires: cookieExpiration,
      })
      .json({
        message: response.data.message,
      }).status(200);

  } catch (err) {
    return res.status(401).json("Belom kelar")
  }
});

module.exports = router;
