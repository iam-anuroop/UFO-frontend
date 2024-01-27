import React from 'react'
import ufologo from '../assets/ufologo.jpeg'
import './Navbar.css'
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className='navbar-main'>
        <div className='navbar-sub'>
            <div>
                <img className='navbar-logo-image' src={ufologo} alt="" />
            </div>
            <div className='navbar-user-icon'>
                <FaUserCircle color='rgb(6, 173, 51)'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar

