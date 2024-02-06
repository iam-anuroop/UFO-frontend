import React, { useState, useEffect, useContext, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Chatting.css'; 
import UserBlock from '../extra/UserBlock';


function Chatting() {
  const { user, authtoken } = useContext(AuthContext);
  const { id } = useParams();
  const [usermanage, setUsermanage] = useState(false);
  const [ admin,setAdmin ] = useState('')
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const client = useRef(new W3CWebSocket(`ws://127.0.0.1:8000/ws/${id}/?token=${authtoken.access}`));
  const chatContainerRef = useRef(null);

  const fetchGroup = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/chat/creategroup/', {
        headers: {
          Authorization: `Bearer ${authtoken.access}`,
        },
        params: {
          uuid: id,
        },
      });
      setAdmin(response.data.group_admin)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {

    fetchGroup();


    client.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    client.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data.sender);
      console.log('Received message:', data.text);
      setMessages((prevMessages) => [...prevMessages, { content: data.text, sender: data.sender }]);
      // Automatically scroll to the bottom when a new message is received
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    client.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    client.current.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    return () => {
      client.current.close();
    };
  }, [id]);

  const sendMessage = () => {
    const messageData = {
      text: messageInput,
      sender: user.username, //username
    };

    if (messageInput.trim().length > 0) {
      client.current.send(JSON.stringify(messageData));
      setMessageInput('');
    }
  };

  return (
    <div className="chat-container">
      {
        usermanage&&<UserBlock/>
      }
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user.username ? 'sent' : 'received'}`}>
            <div className='msg-box'>
              <div onClick={()=>admin&&admin.username===user.username?setUsermanage(!usermanage):setUsermanage(usermanage)} className={`${msg.sender === user.username ? 'message-sender' : 'not-sender'}`}>{msg.sender}</div>
              <div className={`message-content ${msg.sender === user.username ? 'sent-div' : 'receive-div'}`}>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatting;
