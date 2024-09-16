import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn, setUser } from '../redux/slices/authSlice'

const useFetchAuthUser = () => {
    const {isLoggedIn} = useSelector(state=>state.auth) 
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {   
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/user`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    dispatch(setUser(data.user))
                    dispatch(setIsLoggedIn(true))
                } else {
                    dispatch(setUser(null))
                    dispatch(setIsLoggedIn(false))
                }
            } catch (error) {
                console.log(error)
            }
        }
     fetchUser()
    }, [isLoggedIn])

}

export default useFetchAuthUser
