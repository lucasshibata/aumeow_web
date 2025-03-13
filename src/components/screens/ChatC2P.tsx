import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, database, set, ref, push, get, onValue } from '../firebase/Firebase';

export default function Chat() {
    const [funcaoUser, setFuncaoUser] = useState('');
    const [messages, setMessages] = useState<{ nomeEnviou: string, text: string }[]>([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [currentUserName, setCurrentUserName] = useState('');
    const [receiverUserId, setReceiverUserId] = useState<string|undefined>('');
    const [receiverUserName, setReceiverUserName] = useState('');
    const navigate = useNavigate();
    const { PrestadorId, ClienteId } = useParams();
    const user = auth.currentUser;
    
    //===========recuperar a função do usuário atual================
    useEffect(() => {
        if (!user?.uid) return;
        const fetchFuncaoUser = async () => {
            try {
                const funcaoUserRef = await get(ref(database, "users/"+user.uid+"/funcao"));
                setFuncaoUser(funcaoUserRef.val());
            } catch (error) {
                console.error("Erro ao obter o nome do cliente:", error);
            }
        };
    
        fetchFuncaoUser();
    }, [user?.uid]);
    //================================================================    
    
    //===========================================================================
    useEffect(() => {
            if (!user?.uid || !PrestadorId) return;
        
            const messagesRef = ref(database, "messages/");
        
            const unsubscribe = onValue(messagesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Convertendo o objeto do Firebase em um array de mensagens
                    const loadedMessages = Object.values(data) as { nomeEnviou: string, text: string }[];
                    setMessages(loadedMessages);
                }
            });
        
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [user?.uid, PrestadorId, funcaoUser, navigate]); // Executa quando `user?.uid` ou `PrestadorId` mudam
    //===========================================================================
    useEffect(() => {
        const fetchCurrentUserName = async () => {
            try {
                const snapshot = await get(ref(database, 'users/' + user?.uid + '/nome'));
                const value = snapshot.val();
                setCurrentUserName(value);

                if (funcaoUser ==="cliente"){
                    const snapshot = await get(ref(database, 'users/' + PrestadorId + '/nome'));
                    const value = snapshot.val();
                    setReceiverUserName(value);
                    setReceiverUserId(PrestadorId);
                } else{
                    const snapshot = await get(ref(database, 'users/' + ClienteId + '/nome'));
                    const value = snapshot.val();
                    setReceiverUserName(value);
                    setReceiverUserId(ClienteId);
                }

            } catch (error) {
                console.error("Erro ao obter o nome do cliente:", error);
            }
        };
    
        fetchCurrentUserName();
    }, [user?.uid, ClienteId, PrestadorId, funcaoUser]);
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
                UidRecebeu: receiverUserId,
                nomeRecebeu: receiverUserName,
                UidEnviou:  user?.uid,
                nomeEnviou: currentUserName,
                text: message,
                timestamp: new Date().toISOString(),
            };
            // socket.send(JSON.stringify(messageData));
            const messagesRef = push(ref(database, "messages/"));
            set(messagesRef, messageData);
            setMessage('');
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
                <b>{msg.nomeEnviou}</b>: {msg.text}
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
