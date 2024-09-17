import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  const navigate = useNavigate()
  return (
    <div className="md:p-10 md:w-1/2 flex flex-col items-start cursor-pointer mb-5 md:mb-0" onClick={()=>navigate(`/blogs/${post._id}`)}>
      <img src={post?.thumbnail} alt={post.title} className='rounded-lg w-full md:h-80 object-cover'/>
      <h2 className=" md:text-2xl text-xl  font-medium text-gray-900 mt-4 mb-4">
        {post.title}
      </h2>
    
    
      <a className="inline-flex items-center">
        <img
          alt="blog"
          src={post.author?.profilePic}
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-gray-900">
            {post.author?.fullName}
          </span>
          <span className="text-gray-400 text-xs tracking-widest mt-0.5">
            {post.createdAt.slice(0,10)}
          </span>
        </span>
      </a>
    </div>
  )
}

export default Post
