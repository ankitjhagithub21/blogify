import React, { useEffect, useState } from 'react'

const useFetchPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`)
                const data = await res.json()
                setPosts(data)
              
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [])
    return posts
}

export default useFetchPosts
