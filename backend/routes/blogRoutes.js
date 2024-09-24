const express = require('express')
const { createBlog, getAllBlogs, getSingleBlog, deleteBlog, getUserBlogs } = require('../controllers/blogController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const blogRouter = express.Router()

blogRouter.post("/",isAuthenticated,createBlog)
blogRouter.get("/",getAllBlogs)
blogRouter.get("/:blogId",getSingleBlog)
blogRouter.delete("/:blogId",isAuthenticated,deleteBlog)
blogRouter.get("/users/:userId",getUserBlogs)

module.exports = blogRouter