  import Login from './Pages/Login'
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
  import HomePage from './Pages/Student/Student.Home'
  import AdminHome from './Pages/Admin/Admin.Home'
  import { AuthProvider } from './Context/AuthContext'

  function App() {
    return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/student/home' element={<HomePage/>}/>
          <Route path='/admin/home' element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    )
  }

  export default App