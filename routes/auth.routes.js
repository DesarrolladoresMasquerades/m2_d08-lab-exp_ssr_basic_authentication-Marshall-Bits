const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const saltRounds = 5;
const bcrypt = require("bcrypt");

router
.route("/signup")
.get((req,res)=>{
    res.render("signup");
})

module.exports = router;