import { useEffect, useState } from 'react'


const useFetchUserPosts = (userId) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/users/${userId}`)
                const data = await res.json()
                console.log(data)
                if (data.success) {
                    
                    setPosts(data.posts)
                }
            } catch (error) {
                console.log(error)
            }
        }
      if(userId){
        fetchUserPosts()
      }
    }, [])

    return posts
}

export default useFetchUserPosts
