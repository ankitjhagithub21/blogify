import React, { useEffect, useState } from 'react'

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`)
                const data = await res.json()
                setBlogs(data)
              
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])
    return {
        loading,
        blogs
    }
}

export default useFetchBlogs
