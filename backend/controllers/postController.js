const Post = require("../models/post")
const User = require("../models/user")

const createPost = async (req, res) => {
    try {
        const { title, description, thumbnail } = req.body;
        const user = await User.findById(req.userId).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            })
        }

        const post = new Post({
            title,
            description,
            thumbnail,
            author: req.userId
        })

        if (post) {
            user.posts.push(post._id)
        }


        await Promise.all([post.save(), user.save()])


        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find the post by its ID
        const post = await Post.findById(postId);

        // If the post is not found, return a 404 error
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Find the user who is trying to delete the post, and exclude the password field
        const user = await User.findById(req.userId).select("-password");

        // If the user is not found, return a 401 error (unauthorized)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // Check if the user is the author of the post
        if (post.author.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete someone else's post.",
            });
        }

        // Remove the post ID from the user's posts array if it exists
        const postIndex = user.posts.indexOf(post._id);
        if (postIndex > -1) {
            user.posts.splice(postIndex, 1);
        }

        // Save user changes and delete the post
        await Promise.all([user.save(), post.deleteOne()]);

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate({
            path: "author",
            select: "fullName profilePic"
        })

        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



const getSinglePost = async (req, res) => {
    try {

        const { postId } = req.params;

        const post = await Post.findById(postId).populate({
            path: "author",
            select: "fullName profilePic bio"
        })

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found."
            })
        }
        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all posts where the author is the userId
        const posts = await Post.find({ author: userId });

        // Check if posts are found
        if (posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found."
            });
        }

        res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createPost,
    deletePost,
    getAllPost,
    getSinglePost,
    getUserPosts,
}