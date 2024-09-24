import React from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  const navigate = useNavigate()
  return (
    <div className="md:p-10 md:w-1/2 flex flex-col items-start cursor-pointer mb-5 md:mb-0" onClick={()=>navigate(`/blogs/${blog._id}`)}>
      <img src={blog?.thumbnail} alt={blog.title} className='rounded-lg w-full md:h-80 object-cover'/>
      <h2 className=" md:text-2xl text-xl  font-medium text-gray-900 mt-4 mb-4">
        {blog.title}
      </h2>
    
    
      <a className="inline-flex items-center">
        <img
          alt="blog"
          src={blog.author?.profilePic}
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-900">
            {blog.author?.fullName}
          </span>
          <span className="text-gray-400 text-xs tracking-widest mt-0.5">
            {blog.createdAt.slice(0,10)}
          </span>
        </span>
      </a>
    </div>
  )
}

export default Blog
