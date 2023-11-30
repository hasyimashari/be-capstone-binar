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

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is up and running'
  })
})

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryrouter)
app.use('/api', courseRouter)
app.use('/api', chapterRouter)
app.use('/api', modulRouter)
app.use('/api', otpRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
