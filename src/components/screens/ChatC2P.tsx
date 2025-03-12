import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database, set, ref, push, get } from '../firebase/Firebase';

export default function Chat() {
    const [messages, setMessages] = useState<{ uidPrestador: string, text: string }[]>([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [nome, setNome] = useState('');
    const navigate = useNavigate()
    const uidPrestador =  localStorage.getItem("uidPrestador");
    const user = auth.currentUser;
    
    if (uidPrestador == null){
        navigate('/PetServices');
    }
    useEffect(() => {
        const fetchNomeCliente = async () => {
            try {
                const snapshot = await get(ref(database, 'users/' + user?.uid + '/nome'));
                const value = snapshot.val();
                setNome(value);
            } catch (error) {
                console.error("Erro ao obter o nome do cliente:", error);
            }
        };
    
        fetchNomeCliente();
    }, [user?.uid]);

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
                uidPrestador,
                nomePrestador:localStorage.getItem("nomePrestador"),
                uidCliente:user?.uid,
                nomeCliente: nome,
                text: message,
                timestamp: new Date().toISOString(),
            };
            socket.send(JSON.stringify(messageData));
            setMessage('');
            const messagesRef = push(ref(database, "messages/"));
            set(messagesRef, messageData);
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
                <b>{msg.uidPrestador}</b>: {msg.text}
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
