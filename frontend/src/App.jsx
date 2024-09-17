import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import { Toaster } from "react-hot-toast"
import Register from './pages/Register'
import Login from './pages/Login'
import useFetchAuthUser from './hooks/useFetchAuthUser'
import PostDetails from './pages/PostDetails'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import { useSelector } from 'react-redux'

const App = () => {
  useFetchAuthUser()
  const {user} = useSelector(state=>state.auth)
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={user ? <Home/> : <Register/>} />
        <Route path='/login' element={user ? <Home/> : <Login/>} />
        <Route path='/create' element={user ? <CreatePost /> : <Home/>} />
        <Route path='/blogs/:id' element={<PostDetails />} />
        <Route path='/profile' element={user ? <Profile/> : <Home/>} />
        <Route path='/edit-profile' element={user ? <EditProfile /> : <Home/> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
