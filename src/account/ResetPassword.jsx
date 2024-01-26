import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import '../pages/Home.css'





function ResetPassword() {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()




  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const registerEmail = async (e) => {
    // e.preventDefault(); 
    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/register/', { 
    //     email:email
    //   });
    //   console.log('Registration successful:', response.data);
    //   localStorage.setItem('key',JSON.stringify(response.data.key))
    //   localStorage.setItem('email',JSON.stringify(response.data.email))
    //   navigate('/login')
    // } catch (error) {
    //   console.error('Registration failed:', error);
    // }
  };
  

  return (
    <>
    <div style={{display:'flex',justifyContent:'center'}}>
        <h1 style={{marginTop:'5%'}}>Reset password</h1>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='email-modal'
      >
        <Box className='email-box'>
          <div className="email-form">
            <div className="flex-column">
              <label className='email-input-label'>Old password</label>
            </div>
            <div className="email-inputForm">
            <RiLockPasswordFill/>
            <input type="password" name='oldpassword' onChange={handleEmailChange} className="email-input" placeholder="Enter your old password" />
            </div>
            <div className="flex-column">
              <label className='email-input-label'>New password</label>
            </div>
            <div className="email-inputForm">
            <RiLockPasswordFill/>
            <input type="password" name='newpassword' onChange={handleEmailChange} className="email-input" placeholder="Enter your new password" />
            </div>
            <button className="email-form-button button-submit" onClick={registerEmail}>Login</button>
            <p className="email-p line">Or</p> 
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <h4 className="email-p" style={{color:'blue'}} onClick={()=>navigate('/forgot')}>forgot password</h4>
            <h4 className="email-p" style={{color:'blue'}} onClick={()=>navigate('/')}>Go to home</h4>
            </div>
            <div className="email-flex-row">
              <button className="email-google-button btn google">
              <FaGoogle/>
                Continue with Google
              </button>
            </div>
          </div>
        </Box>
        
      </Modal>
    </div>
    </>
  );
}

export default ResetPassword;