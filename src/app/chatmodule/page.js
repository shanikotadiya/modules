'use client'
// components/Chat.js
import { useState, useEffect } from 'react';

let socket;  // Declare the socket outside of useEffect to avoid re-initializing

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // To track socket connection status

  // useEffect with an empty dependency array, so it runs once when the component mounts
  useEffect(() => {
    // Dynamically import socket.io-client only in the browser
    import('socket.io-client').then((module) => {
      // Connect to the server (adjust URL as needed)
      socket = module.default('/api/livechat/socket.io'); // Make sure your server URL is correct

      // Listen for incoming messages
      socket.on('chat_message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      // Check for connection errors
      socket.on('connect_error', () => {
        setIsConnected(false);
        console.error('Socket connection failed');
      });

      // When socket is connected, update state
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to server');
      });
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Send message to the server
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat_message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      {!isConnected && <div style={{ color: 'red' }}>Failed to connect to the server. Please try again.</div>}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
