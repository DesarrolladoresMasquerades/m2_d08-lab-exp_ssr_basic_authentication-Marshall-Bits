const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const saltRounds = 5;
const bcrypt = require("bcrypt");

router
    .route("/signup")
    .get((req, res) => {
        res.render("signup");
    })
    .post((req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        // --- Check if form is not empty --- \\
        if (!username || !password) {
            res.render("signup", { errorMessage: "All fields required!" })
            throw new Error("Validation error");
        }

        User.findOne({ username })
            .then((user) => {
                if (user && user.username) {
                    res.render("signup", { errorMessage: "Sorry, this user is already taken" })
                    throw new Error("Validation error");
                };
            })

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPwd = bcrypt.hashSync(password, salt);

        User.create({ username, password: hashedPwd })
            .then(() => {
                res.redirect("/")
            })
    })

module.exports = router;