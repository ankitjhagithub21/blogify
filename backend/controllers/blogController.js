const Blog = require("../models/blog")
const User = require("../models/user")

const createBlog = async (req, res) => {
    try {
        const { title, description, thumbnail } = req.body;
        const user = await User.findById(req.userId).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            })
        }

        const blog = new Blog({
            title,
            description,
            thumbnail,
            author: req.userId
        })

        if (blog) {
            user.blogs.push(blog._id)
        }


        await Promise.all([blog.save(), user.save()])


        res.status(201).json({
            success: true,
            message: "blog created successfully.",
            blog
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        // Find the blog by its ID
        const blog = await Blog.findById(blogId);

        // If the blog is not found, return a 404 error
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found",
            });
        }

        // Find the user who is trying to delete the blog, and exclude the password field
        const user = await User.findById(req.userId).select("-password");

        // If the user is not found, return a 401 error (unauthorized)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Check if the user is the author of the blog
        if (blog.author.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete someone else's blog.",
            });
        }

        // Remove the blog ID from the user's blogs array if it exists
        const blogIndex = user.blogs.indexOf(blog._id);
        if (blogIndex > -1) {
            user.blogs.splice(blogIndex, 1);
        }

        // Save user changes and delete the blog
        await Promise.all([user.save(), blog.deleteOne()]);

        // Respond with success
        res.status(200).json({
            success: true,
            message: "blog deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate({
            path: "author",
            select: "fullName profilePic"
        })

        res.status(200).json(blogs)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



const getSingleBlog = async (req, res) => {
    try {

        const { blogId } = req.params;

        const blog = await blog.findById(blogId).populate({
            path: "author",
            select: "fullName profilePic bio"
        })

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not found."
            })
        }
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUserBlogs = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all blogs where the author is the userId
        const blogs = await Blog.find({ author: userId });

        // Check if blogs are found
        if (blogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No blogs found."
            });
        }

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getSingleBlog,
    getUserBlogs,
}