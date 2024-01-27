import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

const UserPrivate = ({ children }) => {
  const { authtoken } = useContext(AuthContext)
    return (
       <>
      { authtoken ? children : <Navigate to="/" />}
       </>
    )  };

export default UserPrivate