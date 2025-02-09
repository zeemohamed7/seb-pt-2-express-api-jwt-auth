const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Add bcrypt and the user model
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.post('/sign-up', async (req, res) => {
    try {

        // Check if the username is taken
        const userInDatabase = await User.findOne({ username: req.body.username })

        if(userInDatabase) {
            return res.status(409).json({ err: 'Something went wrong.'})
        }

        // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS))
        })

        // Construct the payload
        const payload = { username: user.username, _id: user._id }

        // Create the token
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        // Send the token instead of user
        res.status(201).json({ token })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router