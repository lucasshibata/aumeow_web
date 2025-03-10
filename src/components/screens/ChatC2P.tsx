import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ChatProps {
  userId: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<{ userId: string, text: string }[]>([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  const { userId } = useParams();
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event) => {
      const messageText = event.data;
      const parsedMessage = JSON.parse(messageText);
      setMessages(prevMessages => [...prevMessages, parsedMessage]);
    };

    ws.onclose = () => {
      console.log('Conexão WebSocket fechada');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && message) {
      const messageData = {
        userId,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socket.send(JSON.stringify(messageData));
      setMessage('');
    } else {
      console.log('WebSocket não está pronto para enviar mensagens');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.userId}</b>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
