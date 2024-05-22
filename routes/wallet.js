require("dotenv").config();

const express = require("express");
const router = express.Router();


router.get("/", (req, res, next)=>{
    res.json({
        type: "TBA-FEATURE",
        data: "On Construction",
        message: "Belom Jadi Kakak"
    });
});

module.exports = router;