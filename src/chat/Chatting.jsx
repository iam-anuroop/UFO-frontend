import React, { useState, useEffect, useContext, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Chatting.css'; // External CSS file for styling

function Chatting() {
  const { user, authtoken } = useContext(AuthContext);
  const { id } = useParams();
  const [room, setRoom] = useState(id);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(authtoken);
  const client = useRef(new W3CWebSocket(`ws://127.0.0.1:8000/ws/${id}/`));
  const chatContainerRef = useRef(null);

  useEffect(() => {
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
      sender: user.email,
    };

    if (messageInput.trim().length > 0) {
      client.current.send(JSON.stringify(messageData));
      setMessageInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user.email ? 'sent' : 'received'}`}>
            <div className={`message-content ${msg.sender === user.email ? 'sent-div' : 'receive-div'}`}>{msg.content}</div>
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
