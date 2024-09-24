import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { setBlogs} from '../redux/slices/blogSlice'

const UserBlogs = ({ blogs }) => {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const handleDeleteBlog = async (blogId) => {
        try {
            if (confirm("Are you sure?")) {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/${blogId}`, {
                    method: "DELETE",
                    credentials: 'include'
                })
                const data = await res.json()

                if (data.success) {
                    toast.success(data.message)
                    const updatedblogs = blogs.filter(blog=>blog._id != blogId)
                    dispatch(setBlogs(updatedblogs))
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
            <h2 className="text-2xl font-semibold my-4">My blogs</h2>
            {blogs.length > 0 ? (
                blogs.map((blog) => (

                    <div key={blog._id} className="bg-white p-4 mb-4 rounded-lg  cursor-pointer custom-shadow">
                        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                        <p className="text-gray-500 text-sm mb-2">posted on {new Date(blog.createdAt).toLocaleDateString()}</p>
                        <div className='flex items-center justify-between'>

                            <Link to={`/blogs/${blog._id}`} className='text-blue-500 hover:text-blue-600'>Read blog</Link>
                            {
                                blog.author == user._id && <button className='btn btn-warning' onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                            }
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">You haven't written any blogs yet.</p>
            )}
        </div>
    )
}

export default UserBlogs
