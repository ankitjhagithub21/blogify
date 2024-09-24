import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify"
import Register from './pages/Register'
import Login from './pages/Login'
import useFetchAuthUser from './hooks/useFetchAuthUser'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import { useSelector } from 'react-redux'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useFetchAuthUser()
  const {user} = useSelector(state=>state.auth)
  return (
    <BrowserRouter>
      <ToastContainer theme='dark' autoClose={1500} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={user ? <Home/> : <Register/>} />
        <Route path='/login' element={user ? <Home/> : <Login/>} />
        <Route path='/create' element={user ? <CreateBlog /> : <Home/>} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/profile' element={user ? <Profile/> : <Home/>} />
        <Route path='/edit-profile' element={user ? <EditProfile /> : <Home/> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
