import React, { useContext, useState } from 'react';
import axios from 'axios';
import Chatting from '../chat/Chatting'
import AuthContext from '../context/AuthContext';

import './FindRandom.css'; 

const FindRandom = () => {
  const { authtoken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchClick = () => {
    setLoading(true);
  
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
  );
};

export default FindRandom;
