import React from 'react'
import Post from '../components/Post'
import useFetchPosts from '../hooks/useFetchPosts'

const Posts = () => {
  const posts = useFetchPosts()
  return (
    <section>
    <div className="container px-5 py-24 mx-auto">
      <h2 className='text-2xl'>Latest Blogs</h2>
      <div className="flex flex-wrap">
        {
          posts.map((post)=>{
            return <Post key={post._id} post={post}/>
          }).reverse()
        }
       
      </div>
    </div>
  </section>
  
  )
}

export default Posts
