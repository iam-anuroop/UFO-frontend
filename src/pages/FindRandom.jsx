import React, { useContext, useState } from 'react';
import axios from 'axios';
import Chatting from '../chat/Chatting'
import AuthContext from '../context/AuthContext';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import './Globalgroups.css'
import './FindRandom.css'; 
import { useNavigate } from 'react-router-dom'

const FindRandom = () => {
  const { authtoken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleSearchClick = () => {
    setLoading(true);
    setError(null)
  
    axios.get('http://127.0.0.1:8000/chat/find/', {
      headers: {
        Authorization: `Bearer ${authtoken.access}`,
      },
    })
      .then(response => {
        if(response.data.msg=="No one online"){
          console.log(response.data.msg,'ppppppppppp');
          setLoading(false);
          setError(response.data.msg)
          
        }else{
          console.log(response);
          setLoading(false);
          setApiResponse(true);
        }
        
      })
      .catch(err => {
        setError('Error occurred. Please try again.')
        setLoading(false);
      });  
  };

  return (
    <div style={{padding:'1%'}}>
      <div className="global-groups-header">
        <button onClick={()=>navigate('/home')} className="global-groups-back-button">
          Back
        </button>
        {/* <button className="global-groups-create-button">
          Create Group   <div><AiOutlineUsergroupAdd fontSize={'20px'}/></div>
        </button> */}
      </div>
    <div className="find-random-container">
      <div className="find-random-search">
        <button className="find-random-search-button" onClick={handleSearchClick}>
          Search <i className="find-random-search-icon fas fa-search"></i>
        </button>
        {loading && <div className="find-random-loading">Loading...</div>}
        {error && <div className="find-random-error">{error}</div>}
      </div>
      {apiResponse && <Chatting/>}
    </div>
    </div>
  );
};

export default FindRandom;
