require("dotenv").config();

const axios = require("axios");
const jwt = require("jsonwebtoken");

async function checkSessionLife(req, res, next) {
    if (req.cookies.token) {
        const url = `${process.env.AUTH_URL}/auth/verify`;

        // if token exist then verif the token through auth service
        const response = await axios.post(url,{token: req.cookies.token});
        const responseData = response.data;

        if(responseData.status === "TOKEN_EXPIRED"){
            
        }
    }
    next();
}

module.exports = {
    checkSessionLife
}