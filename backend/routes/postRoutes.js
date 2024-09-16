const express = require('express')
const { createPost, getAllPost, getSinglePost, deletePost, getUserPosts } = require('../controllers/postController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const postRouter = express.Router()

postRouter.post("/",isAuthenticated,createPost)
postRouter.get("/",getAllPost)
postRouter.get("/:postId",getSinglePost)
postRouter.delete("/:postId",isAuthenticated,deletePost)
postRouter.get("/users/:userId",getUserPosts)

module.exports = postRouter