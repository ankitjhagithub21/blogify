import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/${id}`)
        const data = await res.json()
        setBlog(data.post)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  if (loading) {
    return <Loader/>
  }

  return (
    <section>
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="max-w-5xl mx-auto">
          {/* Blog Image */}
          <div className="rounded-lg md:h-96 h-72 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src={blog?.thumbnail}
            />
          </div>

          {/* Blog Title */}
          <h1 className="mt-5 text-2xl font-semibold text-gray-800">{blog?.title}</h1>

          {/* Blog Content */}
          <div className="mt-5 text-lg" dangerouslySetInnerHTML={{ __html: blog?.description }} />

          {/* Author Details Section */}
          <h1 className='mt-12 text-2xl font-bold'>About the Author</h1>
          <div className=" border-t-2 mt-2 border-gray-200">
         
            <div className="flex items-center mt-4">
              {/* Author Image */}
              <img
                src={blog?.author?.profilePic}
                alt="Author"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                {/* Author Name */}
                <h3 className="text-xl font-bold text-gray-900">By {blog?.author?.fullName}</h3>
                {/* Author Bio */}
                <p className="text-gray-600">{blog?.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogDetails
