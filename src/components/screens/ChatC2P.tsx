import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database, set, ref, push, get, onValue } from '../firebase/Firebase';

export default function Chat() {
    const [messages, setMessages] = useState<{ uidPrestador: string, text: string }[]>([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [currentUserName, setCurrentUserName] = useState('');
    const uidPrestador =  localStorage.getItem("uidPrestador");
    const user = auth.currentUser;
    
    // if (uidPrestador == null){
    //     navigate('/PetServices');
    // }
    //===========================================================================
    useEffect(() => {
        if (!user?.uid || !uidPrestador) return;
    
        const messagesRef = ref(database, "messages/");
    
        const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
            if (data) {
                // Convertendo o objeto do Firebase em um array de mensagens
                const loadedMessages = Object.values(data) as { uidPrestador: string, text: string }[];
                setMessages(loadedMessages);
            }
        });
    
        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [user?.uid, uidPrestador]); // Executa quando `user?.uid` ou `uidPrestador` mudam
    //===========================================================================
    useEffect(() => {
        const fetchNomeCliente = async () => {
            try {
                const snapshot = await get(ref(database, 'users/' + user?.uid + '/nome'));
                const value = snapshot.val();
                setCurrentUserName(value);
            } catch (error) {
                console.error("Erro ao obter o nome do cliente:", error);
            }
        };
    
        fetchNomeCliente();
    }, [user?.uid]);
    //===========================================================================
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                const text = await event.data.text(); // Converte Blob para texto
                try {
                    const parsedMessage = JSON.parse(text);
                    setMessages(prevMessages => [...prevMessages, parsedMessage]);
                } catch (error) {
                    console.error("Erro ao parsear JSON:", error, text);
                }
            } else {
                try {
                    const parsedMessage = JSON.parse(event.data);
                    setMessages(prevMessages => [...prevMessages, parsedMessage]);
                } catch (error) {
                    console.error("Erro ao parsear JSON:", error, event.data);
                }
            }
        };

        ws.onclose = () => {
            console.log('Conexão WebSocket fechada');
        };

        return () => {
            ws.close();
        };
    }, []);
    //===========================================================================
    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && message) {
            const messageData = {
                uidPrestador,
                nomePrestador:localStorage.getItem("nomePrestador"),
                uidCliente:user?.uid,
                nomeCliente: currentUserName,
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
    //===========================================================================
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
