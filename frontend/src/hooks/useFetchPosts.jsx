import React, { useEffect, useState } from 'react'

const useFetchPosts = () => {
    const [posts, setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`)
                const data = await res.json()
                setPosts(data)
              
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])
    return {
        loading,
        posts
    }
}

export default useFetchPosts
