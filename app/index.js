const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const courseRouter = require('./routes/course.js')
const modulRouter = require('./routes/modul.js')

const app = express()
const PORT = 3004

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
app.use('/api', courseRouter)
app.use('/api', modulRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
