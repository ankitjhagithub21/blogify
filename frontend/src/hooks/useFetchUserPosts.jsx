import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPosts } from '../redux/slices/postSlice'


const useFetchUserPosts = (userId) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts/users/${userId}`)
                const data = await res.json()

                if (data.success) {
                    dispatch(setPosts(data.posts))
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (userId) {
            fetchUserPosts()
        }
    }, [])


}

export default useFetchUserPosts
