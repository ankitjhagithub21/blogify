import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBlogs } from '../redux/slices/blogSlice'


const useFetchUserBlogs = (userId) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/users/${userId}`)
                const data = await res.json()

                if (data.success) {
                    dispatch(setBlogs(data.blogs))
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (userId) {
            fetchUserBlogs()
        }
    }, [])


}

export default useFetchUserBlogs
