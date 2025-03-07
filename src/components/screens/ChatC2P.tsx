import React, { useState, useEffect } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]); 
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = async (event) => {
      const messageBlob = event.data;
      const messageText = await messageBlob.text(); // Converte o Blob em texto

      setMessages(prevMessages => [...prevMessages, messageText]);
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
      socket.send(message);
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
          <div key={index}>{msg}</div>
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
