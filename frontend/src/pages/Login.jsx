import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from '../redux/slices/authSlice'

const Login = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email,
            password
        }

        setLoading(true)
        const toastId = toast.loading("Processing your data.")
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
                dispatch(setIsLoggedIn(true))
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            toast.dismiss(toastId)
        }
    }

    const handleDemoAccount = () => {
        setEmail("test@gmail.com")
        setPassword("Test@123")
    }

    return (
        <section className='p-5'>
            <div className='my-24 max-w-xl mx-auto p-5 rounded-xl custom-shadow'>
                <h2 className='text-2xl font-bold mb-5'>Login to your account.</h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                    <label className="input input-primary input-bordered bg-transparent  flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="text"
                            className="grow "
                            placeholder="Enter email"
                            name='email'
                            
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="input input-primary bg-transparent input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input
                            type="password"
                            className="grow"
                            name='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button type='submit' disabled={loading} className={'btn btn-primary text-lg'}>Login</button>
                </form>
                <p className='my-5'>Don't have an account ? <Link to={"/register"} className='underline text-blue-500'>Register here</Link> </p>
                <button className='btn' onClick={handleDemoAccount}>Use demo account</button>

            </div>
        </section>
    )
}

export default Login
