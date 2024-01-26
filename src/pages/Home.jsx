import React, { useEffect, useState } from 'react'
import './Home.css'
import GetstartButton from '../extra/GetstartButton'
import ufologo from '../assets/ufologo.jpeg'
import { FaVideo } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  const [ register,setRegister ] = useState(false)
  const [email, setEmail] = useState(''); 

  const navigate = useNavigate()

  const handleClose = () => setRegister(false);

  const handleButtonClick = () => {
    setRegister(prevState => !prevState);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const registerEmail = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/register/', { 
        email:email
      });
      console.log('Registration successful:', response);
    //   localStorage.setItem('key',JSON.stringify(response.data.key))
    //   localStorage.setItem('email',JSON.stringify(response.data.email))
    //   navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {

  }, [register]);

  return (
    <div className='home-master'>
      {register&&
      <div>
      <Modal
        open={register}
        onClose={handleClose}
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
            <button className="email-form-button button-submit" onClick={registerEmail}>Get Password <RiLockPasswordFill/></button>
            <p className="email-p line">Or</p> 
            <p className="email-p" onClick={()=>navigate('/login')}  style={{color:"blue"}}>Already have an Account</p>
            <div className="email-flex-row">
              <button className="email-google-button btn google">
              <FaGoogle/>
                Continue with Google
              </button>
            </div>
          </div>
        </Box>
        
      </Modal>
    </div>}
    <div className='home-main'>
      <div className='get-start'>
        <div className='logo-image-div'>
          <img className='logo-image' src={ufologo} alt="" />
        </div>
        <div onClick={handleButtonClick}>
          <GetstartButton/>
        </div>
      </div>
      <div className="home-heading-div">
        <div className="home-heading-sub">
          <h1 className="home-heading">UFO :)</h1>
          <h3 className="home-heading-det">
            may be the stranger have some intersting opinions...
          </h3>
        </div>
      </div>
      <div className='home-content-main'>
        <div className='home-content-sub'>
          <div className='home-content-first-div'>
            <div className="video-call-icons-1">
              <FaVideo className='video-call-icon'/>
              <IoMdMic className='video-call-icon'/>
              <IoCall className='video-call-icon'/>
            </div>
            <img className='home-content-first-img' src="https://img.freepik.com/free-photo/medium-shot-woman-with-big-smile_23-2149335015.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
          </div>
          <div className='home-content-second-div'>
            <div className="video-call-icons-2">
              <FaVideo className='video-call-icon'/>
              <IoMdMic className='video-call-icon'/>
              <IoCall className='video-call-icon'/>
            </div>
            <img className='home-content-second-img' src="https://img.freepik.com/free-photo/young-hispanic-call-center-agent-man-smiling-happy-working-office_839833-34402.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
          </div>
      </div>
    </div>
    <div className="home-details-div">
        <div className="home-details-sub">
          <div className="home-details-1">
            <div>
              <img src="https://img.freepik.com/free-photo/3d-rendering-people-avatars-zoom-call_23-2149576743.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
            </div>
            <div className='home-details-text'>
              <h3>Video chat with random people</h3><br/>
              <span>find people randomly and talk with them world wide.</span>
            </div>
          </div>
          <div className="home-details-2">
            <div>
              <img src="https://img.freepik.com/free-photo/3d-rendering-people-avatars-zoom-call_23-2149576742.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
            </div>
            <div className='home-details-text'>
            <h3>Virtual messaging community </h3><br/>
              <span>start a global chat that every one can join and contribute with their opinions.</span>
            </div>
          </div>
          <div className="home-details-3">
            <div>
              <img src="https://img.freepik.com/free-photo/3d-rendering-people-avatars-zoom-call_23-2149576744.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
            </div>
            <div className='home-details-text'>
            <h3>Connect new friends</h3><br/>
              <span>connect with people that you met this feature will be available soon..</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home