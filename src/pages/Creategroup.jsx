import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import './Creategroup.css';

const Creategroup = () => {
    const { authtoken } = useContext(AuthContext);
    const [groupName, setGroupName] = useState('');
    const [groupSubject, setGroupSubject] = useState('');


    const handleCreateGroup = async () => {
        try {
          if (!groupName || !groupSubject) {
            alert('Please fill in all fields.');
            return;
          }
      
          const response = await axios.post(
            'http://127.0.0.1:8000/chat/creategroup/',
            {
              name: groupName,
              subject: groupSubject,
            },
            {
              headers: {
                Authorization: `Bearer ${authtoken.access}`,
              },
            }
          );
      
          console.log(response.data);
      
          setGroupName('');
          setGroupSubject('');
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.error('Error creating group:', error.response);
            const msg = `you are already an admin of another group. if you want to create a new group please make any other member as admin or delete the group. name : ${error.response.data.group.name} id : ${error.response.data.group.id}`
            alert(msg);
          } else {
            console.error('Error creating group:', error.message);
          }
        }
      };
      

  return (
    <div className="create-group-container">
      <label className="create-group-label" htmlFor="groupName">
        Group Name:
      </label>
      <input
        className="create-group-input"
        type="text"
        id="groupName"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <label className="create-group-label" htmlFor="groupSubject">
        Group Subject:
      </label>
      <input
        className="create-group-input"
        type="text"
        id="groupSubject"
        value={groupSubject}
        onChange={(e) => setGroupSubject(e.target.value)}
      />

      <button className="create-group-button" onClick={handleCreateGroup}>
        Create
      </button>
    </div>
  );
};

export default Creategroup
