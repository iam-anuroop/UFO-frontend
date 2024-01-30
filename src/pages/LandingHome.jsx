import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './LandingHome.css'
import Navbar from '../extra/Navbar';
import { useNavigate } from 'react-router-dom';

const LandingHome = () => {

  const navigate = useNavigate()

  return (
    <div className='land-home-main'>
        <div>
            <Navbar/>

        </div>

        <div className='land-home-second'>
        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper elevation={3} onClick={()=>navigate('/global')}>
        <img className='choose-globalchat' src="https://img.freepik.com/premium-vector/businessman-sitting-floor-works-with-laptop_132971-223.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
        <div className='landing-page-detail'>
            <h3>Global Chat</h3>
            <p>-------------</p>
            <p>Join Global groups to share opinion</p>
        </div>
        </Paper>
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper elevation={3} >
        <img className='choose-message' src="https://img.freepik.com/free-vector/group-people-chatting-each-other-using-phone_74855-10709.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
        <div className='landing-page-detail'>
            <h3>Message</h3>
            <p>-------------</p>

            <p>Message with random person</p>
        </div>
        </Paper>
    </Box>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper elevation={3} >
        <img className='choose-videochat' src="https://img.freepik.com/premium-vector/video-call-conference-working-from-home-social-distancing-business-discussion_107661-10.jpg?size=626&ext=jpg&ga=GA1.1.1690005628.1706170932&semt=ais" alt="" />
        <div className='landing-page-detail'>
        <h3>Video chat</h3>
        <p>-------------</p>

        <p>Video chat with random persons</p>
        </div>
        </Paper>
    </Box>
    </div>
    </div>

  )
}

export default LandingHome
