import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Globalgroups.css';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Creategroup from './Creategroup';
import axios from 'axios';
import AuthContext from '../context/AuthContext';




const Globalgroups = () => {
  const { authtoken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ create,setCreate ] = useState(false)
  const [globalGroups , setGlobalgroups] = useState([])



  const handleClose = () => setCreate(false);

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  const handleJoinGroupClick = (id) => {
    // Handle create group button click
    console.log('Create Group button clicked',id);
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/chat/globalgroups/',
        {
          headers: {
            Authorization: `Bearer ${authtoken.access}`,
          },
        }
      );
  
      console.log(response.data);
      setGlobalgroups(response.data)
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Error creating group:', error.response);
      } else {
        console.error('Error creating group:', error.message);
      }
    }
  };

  useEffect(()=>{
    fetchGroups();
  },[])

  // const globalGroups = [
  //   { id: 1, name: 'Lets Talk About Global warming...', members: 25 },
  //   { id: 2, name: 'Lets Make friends', members: 18 },
  //   { id: 3, name: 'Need of Sex Education...', members: 30 },
  //   // Add more groups as needed
  // ];

  return (
    <div className="global-groups-container">
      <div className="global-groups-header">
        <button className="global-groups-back-button" onClick={handleBackButtonClick}>
          Back
        </button>
        <button className="global-groups-create-button" onClick={()=>setCreate(true)}>
          Create Group   <div><AiOutlineUsergroupAdd fontSize={'20px'}/></div>
        </button>
      </div>

      {create && <Modal
        open={create}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='email-modal'
      >
        <Box className='email-box'>
          <Creategroup/>
        </Box>
        
      </Modal>}

      {globalGroups.map((group) => (
        <div className="global-group" key={group.id}>
            <div className='global-group-det'>
                <div className="global-group-name">{group.name}</div>
                <div className="global-group-details"><h4>subject: {group.subject}</h4> </div>
                <div className="global-group-details">Members: {group.members.length}</div>
                {/* <div className="global-group-details">Group ID: {group.id}</div> */}
            </div>
          <div>
            <button
              className="global-groups-join-button"
              onClick={() => navigate(`/chatting/${group.uuid_field}`)}
            >
              Join
            </button></div>
        </div>
      ))}
    </div>
  );
};

export default Globalgroups;
