import React from 'react'
import Login from './Pages/Login'
import Home from './Pages/StudentHome'
import Form from './Pages/Form'
import AluminiHome from './Pages/AluminiHome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/StudentHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/student/home' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App