import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

function Chatting() {
  const { user,authtoken } = useContext(AuthContext);
  const [room, setRoom] = useState('test');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(authtoken);
  const client = useMemo(() => new W3CWebSocket(`ws://127.0.0.1:8000/ws/test/`), [room]);
  const chatContainerRef = useRef(null);

  useEffect(() => {

    client.onopen = () => {
      console.log('WebSocket connection opened');
    };

    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data.sender);
      console.log('Received message:', data.text);

      setMessages((prevMessages) => [...prevMessages, { content: data.text, sender: data.sender }]);
    };

    client.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    client.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    
    return () => {
      client.close();
    };
  }, [client]);


  const sendMessage = () => {
    const messageData = {
      text: messageInput,
      sender: user.email,
    };

    if ((messageInput.trim()).length > 0) {
      client.send(JSON.stringify(messageData));
      setMessageInput('');
    }
  };

  return (
    <div>
      <div style={{ height: '300px', border: '1px solid #ccc', padding: '10px', overflowY: 'auto' }} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} >
            <div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='chat-box-input-div'>
        <input
          className='chat-box-input'
          type="text"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage} className='chat-box-send-btn'>
          <i className="chat-box-send-icon fa-solid fa-paper-plane"></i>
        </button>

      </div>
    </div>
  );
}

export default Chatting;