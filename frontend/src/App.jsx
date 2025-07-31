import React from 'react'
import Login from './Pages/Login'
import Home from './Pages/StudentHome'
import Form from './Pages/Form'
import AluminiHome from './Pages/AluminiHome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/StudentHome'
import StudentProfile from './Pages/Profile/StudentProfile'
import AdminHome from './Pages/Admin/AdminHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/student/home' element={<HomePage/>}/>
        <Route path='/add' element={<AdminHome/>}/>
        <Route path='/student/profile' element={<StudentProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App