import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setIsLoggedIn, setUser } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'

const Navbar = () => {
  const {user} = useSelector(state=>state.auth)
  const dispatch  = useDispatch()
  const handleLogout = async() =>{
   try{
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/logout`,{
      credentials:'include'
    })
    const data = await res.json()
    if(data.success){
      dispatch(setIsLoggedIn(false))
      dispatch(setUser(null))
      toast.success(data.message)
    }
   }catch(error){
    console.log(error)
   }
   
    
  }
  return (
    <nav className='custom-shadow'>
      <div className="navbar bg-base-100 container mx-auto">
      <div className="flex-1">
        <Link to={"/"}>
          <img src="/navlogo.png" alt="image upload" width={150} className='bg-white'/>
        </Link>
      </div>
      <div className="flex-none">

        
       {
        user ? 
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt=" Navbar component"
                src={user.profilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
           
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/create"}>Create Blog</Link></li>
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div> : <Link to={"/login"} className='btn btn-primary'>Login</Link>
       }
      </div>
    </div>
    </nav>
  )
}

export default Navbar
