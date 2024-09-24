require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./dbconnection')
const authRouter = require('./routes/authRoutes')
const blogRouter = require('./routes/blogRoutes')
const app = express()

const port = process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))

app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({
    "message":"Api working."
  })
})

app.use("/blogs",blogRouter)
app.use("/auth",authRouter)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})