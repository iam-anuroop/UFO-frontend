import { useState } from 'react'
import AuthContext from './context/AuthContext'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'


function App() {

  const context = {

  }

  return (
    <>
      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<Home/>} path='/'/>
        
      
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
