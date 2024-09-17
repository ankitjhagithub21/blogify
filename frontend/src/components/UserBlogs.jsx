import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setPosts } from '../redux/slices/postSlice'

const UserBlogs = ({ posts }) => {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const handleDeleteBlog = async (blogId) => {
        try {
            if (confirm("Are you sure?")) {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/${blogId}`, {
                    method: "DELETE",
                    credentials: 'include'
                })
                const data = await res.json()

                if (data.success) {
                    toast.success(data.message)
                    const updatedPosts = posts.filter(post=>post._id != blogId)
                    dispatch(setPosts(updatedPosts))
                } else {
                    toast.error(data.message)
                }

            }
        } catch (error) {
            console.log(error);

            toast.error("Something went wrong.")
        }
    }

    return (
        <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold my-4">My Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (

                    <div key={post._id} className="bg-white p-4 mb-4 rounded-lg  cursor-pointer custom-shadow">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                        <div className='flex items-center justify-between'>

                            <Link to={`/blogs/${post._id}`} className='text-blue-500 hover:text-blue-600'>Read blog</Link>
                            {
                                post.author == user._id && <button className='btn btn-warning' onClick={() => handleDeleteBlog(post._id)}>Delete</button>
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">You haven't written any posts yet.</p>
            )}
        </div>
    )
}

export default UserBlogs
