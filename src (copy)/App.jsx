
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Register from './Pages/Auth/Register'
// import Login from './Pages/Auth/Login'
import Login2 from './Pages/Auth/Login2'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import Create from './Pages/Post/Create'
import Show from './Pages/Post/Show'
import Update from './Pages/Post/Update'
import Posts from './Pages/Post/Posts'
import Dashboard from './Pages/Post/Dashboard'
import ResetPassword from './Pages/Auth/ResetPassword'
import Roles from './Pages/Roles/Roles'

export default function App() {
  const {user} = useContext(AppContext)
  return <BrowserRouter>
    <Routes>
          <Route path='/' element={<Login2/>}></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/reset_password/:id' element={<ResetPassword/>}></Route>
        {/* <Route path='/' element={<Layout/>}> */}
          {/* <Route index element={<Home/>} /> */}
          <Route path="/dashboard" element={user ? <Dashboard/> : <Login2/>} />
          <Route path='/home' element={user ? <Home/> : <Login2/>} />
          <Route path='/register' element={user ? <Register/>:<Login2/>} />
          {/* <Route path='/login' element={user ? <Home/> : <Login/>} /> */}
          <Route path='/posts' element={user ? <Posts/> : <Login2/>} />
           <Route path='/create' element={user ? <Create/> : <Login2/>} />
          <Route path='/posts/:id' element={<Show/>} />
          <Route path='/roles' element={user ?<Roles/>:<Login2/>} />
          <Route path='/posts/update/:id' element={user ? <Update/> : <Login2/>} />
        {/* </Route> */}
    </Routes>
  </BrowserRouter>
}
