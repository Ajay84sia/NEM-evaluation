const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            if (hash) {
                const user = new UserModel({ name, email, gender, password: hash })
                await user.save()
                res.status(200).send({ "msg": "New User Registered Successfully" })
            }
        });

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign({ username: user.name, useremail: user.email }, 'evaluation');
                    res.status(200).send({ "msg": "Login Successful!!", "token": token })
                } else {
                    res.status(200).send({ "msg": "Invalid Credentials!!" })
                }
            });
        } else {
            res.status(200).send({ "err": "User Not Found" })
        }

    } catch (error) {
        res.status(400).send({ "err": err.message })
    }


})

module.exports = {
    userRouter
}