import React, { useState } from 'react'
import Post from '../components/Post'
import useFetchPosts from '../hooks/useFetchPosts'
import Loader from '../components/Loader'

const Posts = () => {
  const { loading, posts } = useFetchPosts()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts based on the search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <Loader />
  }

  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        
        <div className="flex items-center bg-gray-200 px-3 mb-10 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search blog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 text-lg bg-transparent outline-none w-full"

          />
          <i className='fa fa-search text-2xl'></i>
        </div>
        <div className="flex flex-wrap">
          {
            filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Post key={post._id} post={post} />
              )).reverse()
            ) : (
              <div className='py-24 w-full flex items-center justify-center'>
                    <h1 className='text-xl'>No Blog found.</h1>

              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Posts
