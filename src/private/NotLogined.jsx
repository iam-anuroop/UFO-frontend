import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext';
import { Navigate } from 'react-router-dom'

const NotLogined = ({ children }) => {
  const { authtoken } = useContext(AuthContext)
    return (
       <>
      { !authtoken ? <Navigate to="/home" />:children }
       </>
    )  };

export default NotLogined