import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, database, set, ref, push, get, onValue } from '../../firebase/Firebase'; 
import Header from '../../layout/Header';
import "./ChatC2P.css";
import withAuth from '../../contexts/LoginContext';
import { IoSend } from "react-icons/io5";


function Chat() {
    const [funcaoUser, setFuncaoUser] = useState('');
    const [messages, setMessages] = useState<{ UidEnviou:string, nomeEnviou: string, text: string }[]>([]);
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
                    const loadedMessages = Object.values(data) as { UidEnviou:string, nomeEnviou: string, text: string }[];
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
        const wss = new WebSocket("wss://15.229.232.55");
        setSocket(wss);

        wss.onmessage = async (event) => {
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

        wss.onclose = () => {
            console.log('Conexão WebSocket fechada');
        };

        return () => {
            wss.close();
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
        <div className='ContainerChat'>
            <Header/>
            <div className='InnerContainerChat'>
                <h1>Chat</h1>
                <div className='BlocoDeChats'>
                    {messages.map((msg, index) => {
                        const isMine = msg.UidEnviou === user?.uid;
                        return(
                            <div key={index} className={`${isMine ? 'sentUser' : 'receivedUser'}`}>
                                <p className='text'><strong>{msg.nomeEnviou}</strong><br/> {msg.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='CaixaEnvioChat'>
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}><IoSend/></button>
            </div>
        </div>
    );
}

export default withAuth(Chat);