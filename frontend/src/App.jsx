  import Login from './Pages/Login'
  import { BrowserRouter, Route, Routes } from 'react-router-dom'
  import HomePage from './Pages/Student/Student.Home'
  import StudentProfile from './Pages/Student/Student.Profile'
  import AdminHome from './Pages/Admin/Admin.Home'
  import StudentCompanyProfile from './Pages/Student/Student.CompanyProfile'
  import { AuthProvider } from './Context/AuthContext'
import Invitation from './static/Invitation.jsx'

  function App() {
    return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/student/home' element={<HomePage/>}/>
          <Route path='/student/profile' element={<StudentProfile/>}/>
          <Route path='/admin/home' element={<AdminHome/>}/>
          <Route path="/temp" element={<StudentCompanyProfile/>}/>
          <Route path='/invitation/accept/:id' element={<Invitation/>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    )
  }

  export default App