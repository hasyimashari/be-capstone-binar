const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const courseRouter = require('./routes/course.js')
const modulRouter = require('./routes/modul.js')
const otpRouter = require('./routes/otp.js')

const app = express()
const PORT = 3004

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', courseRouter)
app.use('/api', modulRouter)
app.use('/api', otpRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
