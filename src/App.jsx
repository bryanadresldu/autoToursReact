import { Route, BrowserRouter, Routes, Navigate } from 'react-router'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect, useState } from 'react'
import { authFirebase } from './firebase'

function App() {

  const [user, setUser] = useState("")

  useEffect(() => {
    authFirebase.onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [])
  
  

  return (
    <>
      <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/login'/>} />
                <Route path="/login" element={user ? <Navigate to="/dashboard"/> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard"/>: <Register />} />
              </Routes>
      </BrowserRouter>
    </>
  )
}

export default App