const { each } = require('async')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Auth = require('../models/Auth')

router.get('/users', async (req, res) => {

    try {
        const findUsers = await Auth.find()
        if (findUsers) {
            allUsers = []
            each(findUsers, (user) => {
                users = {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                }
                allUsers.push(users)
                // res.json(users)
            })
            res.json(allUsers)

        }
    } catch (err) {
        res.json("Error: " + err)
    }

})



router.post('/login', async (req, res) => {
    try {
        const authUser = await Auth.findOne({ username: req.body.username })

        if (authUser && bcrypt.compareSync(req.body.password, authUser.password)) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY
            userData = {
                userId: authUser._id,
                firstName: authUser.firstName,
                lastName: authUser.lastName,
                email: authUser.email,
                username: authUser.username
            }
            const token = jwt.sign(userData, jwtSecretKey);
            // console.log('Processed!')
            res.json({ user: userData, token: token })
        }
        else {
            res.json("Invalid username / password!")
        }
    }
    catch (err) {
        res.json("Error: " + err)
    }

})


router.post('/register', async (req, res) => {
    const users = await Auth.findOne({ email: req.body.email })
    // console.log(users)
    if (!users || !users.email == req.body.email || !users.username == req.body.username) {
        try {
            const user = new Auth({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            const create = await user.save()
            // let jwtSecretKey = process.env.JWT_SECRET_KEY;
            // const token = jwt.sign(user, jwtSecretKey);
            res.json({ status: "Success!" })

        }
        catch (err) {
            res.json("Error: " + err)
        }
    }
    else {
        res.json("Username / Email already exists!")
    }
})


module.exports = router