const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
const testJwtRouter = require('./controllers/test-jwt')
const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

// Routes go here
app.use('/auth', authRouter)
app.use('/test-jwt', testJwtRouter)
app.use('/users', usersRouter)



app.listen( process.env.PORT || 3000, () => {
    console.log("The express app is ready")
})

