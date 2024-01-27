import { useState } from 'react'
import AuthContext from './context/AuthContext'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './account/Login'
import ResetPassword from './account/ResetPassword'
import ForgotPassword from './account/ForgotPassword'
import Register from './account/Register'
import LandingHome from './pages/LandingHome'
import UserPrivate from './private/UserPrivate'
import NotLogined from './private/NotLogined'


function App() {

  const [ user, setUser ] = useState()
  const [ authtoken, setAuthtoken ] = useState(
    localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
  )

  const context = {
    user,setUser,
    authtoken,setAuthtoken
  }

  return (
    <>
      <AuthContext.Provider value={context}>
        <Routes>
          <Route element={<NotLogined><Home/></NotLogined>} path='/'/>
          <Route element={<NotLogined><Login/></NotLogined>} path='/login'/>
          <Route element={<NotLogined><Register/></NotLogined>} path='/register'/>
          <Route element={<ForgotPassword/>} path='/forgot'/>
          <Route element={<UserPrivate><ResetPassword/></UserPrivate>} path='/reset'/>
          <Route element={<UserPrivate><LandingHome/></UserPrivate>} path='/home'/>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
