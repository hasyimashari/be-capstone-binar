const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')

const app = express()
const PORT = 3004

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRouter)
app.use('/', userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
