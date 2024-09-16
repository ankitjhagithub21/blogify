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

const App = () => {
  useFetchAuthUser()
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/blogs/:id' element={<PostDetails />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
