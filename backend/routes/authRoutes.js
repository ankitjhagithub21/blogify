const express = require('express')
const { register, login, logout, getUser, EditProfile } = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const authRouter = express.Router()


authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",isAuthenticated,logout)
authRouter.get("/user",isAuthenticated,getUser)
authRouter.put("/user",isAuthenticated,EditProfile)

module.exports = authRouter