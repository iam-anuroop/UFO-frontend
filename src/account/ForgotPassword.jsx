import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import '../pages/Home.css'
import AuthContext from '../context/AuthContext';




function ForgotPassword() {
  const { authtoken } = useContext(AuthContext)
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate()




  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const registerEmail = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/forgot/', { 
        email:email
      });
      console.log('Registration successful:', response.data);
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  

  return (
    <>
    <div className='home-main' style={{display:'flex',justifyContent:'center'}}>
        <h1 style={{marginTop:'5%'}}>Forgot password</h1>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='email-modal'
      >
        <Box className='email-box'>
          <div className="email-form">
            <div className="flex-column">
              <label className='email-input-label'>Email</label>
            </div>
            <div className="email-inputForm">
            <MdAlternateEmail/>
            <input type="email" name='Email' onChange={handleEmailChange} className="email-input" placeholder="Enter your Email" />
            </div>
            <button className="email-form-button button-submit" onClick={registerEmail}>Send mail<RiLockPasswordFill/></button>
            <p className="email-p line">Or</p>
            <p className="email-p" style={{color:'blue'}} onClick={()=>authtoken?navigate('/home'):navigate('/')}>Back to home</p>
            
          </div>
        </Box>
        
      </Modal>
    </div>
    </>
  );
}

export default ForgotPassword;