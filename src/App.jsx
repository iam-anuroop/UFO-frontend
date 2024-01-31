import { useState } from 'react'
import AuthContext from './context/AuthContext'
import { Route,Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Home from './pages/Home'
import Login from './account/Login'
import ResetPassword from './account/ResetPassword'
import ForgotPassword from './account/ForgotPassword'
import Register from './account/Register'
import LandingHome from './pages/LandingHome'
import UserPrivate from './private/UserPrivate'
import NotLogined from './private/NotLogined'
import Chatting from './chat/Chatting'
import Globalgroups from './pages/Globalgroups'

function App() {

  const [ authtoken, setAuthtoken ] = useState(
    localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
    )


  const [ user, setUser ] = useState(
    authtoken&&jwtDecode(authtoken.access)
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
          <Route element={<UserPrivate><Chatting/></UserPrivate>} path='/chatting/:id'/>
          <Route element={<UserPrivate><Globalgroups/></UserPrivate>} path='/global'/>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
