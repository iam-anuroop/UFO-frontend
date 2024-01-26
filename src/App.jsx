import { useState } from 'react'
import AuthContext from './context/AuthContext'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './account/Login'
import ResetPassword from './account/ResetPassword'
import ForgotPassword from './account/ForgotPassword'
import Register from './account/Register'


function App() {

  const context = {

  }

  return (
    <>
      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Login/>} path='/login'/>
          <Route element={<Register/>} path='/register'/>
          <Route element={<ForgotPassword/>} path='/forgot'/>
          <Route element={<ResetPassword/>} path='/reset'/>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
