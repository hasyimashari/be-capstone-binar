require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const categoryrouter = require('./routes/category.js')
const courseRouter = require('./routes/course.js')
const chapterRouter = require('./routes/chapter.js')
const modulRouter = require('./routes/modul.js')
const otpRouter = require('./routes/otp.js')
const orderRouter = require('./routes/order.js')
const appRouter = require('./routes/app.js')

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryrouter)
app.use('/api', courseRouter)
app.use('/api', chapterRouter)
app.use('/api', modulRouter)
app.use('/api', otpRouter)
app.use('/api', orderRouter)
app.use(appRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
