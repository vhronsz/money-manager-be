require("dotenv").config();

const axios = require("axios");
const jwt = require("jsonwebtoken");

async function checkSessionLife(req, res, next) {
  const url = `${process.env.AUTH_URL}/auth/verify`;
  try {
    const response = await axios.post(
      url,
      { token: req.cookies.token },
      { headers: { APP_SOURCE: "money_manager" } }
    );
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      'ok': false,
      'message': "Unable to authenticate user",
    });
  }
}

module.exports = {
  checkSessionLife,
};