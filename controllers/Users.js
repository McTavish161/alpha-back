const { each } = require('async')
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.name = req.body.name
        user.age = req.body.age
        user.phone = req.body.phone
        user.email = req.body.email

        const data = await user.save()
        res.json(data)
    } catch (err) {
        console.log("Error: " + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.json('User not found!')
        }
        else {
            const data = await user.delete()
            res.json(data)
        }

    } catch (err) {
        console.log("Error: " + err)
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email
    })
    const users = await User.findOne({ email: req.body.email })

    // console.log(emails)
    if (!users === req.body.email) {
        try {
            const save = await user.save()
            res.json(save)
        } catch (err) {
            console.log("Error: " + err)
        }
    }
    else {
        res.json("Email already exists!")
    }
})

module.exports = router