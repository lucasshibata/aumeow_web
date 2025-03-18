import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {auth, database, ref, get} from "../../firebase/Firebase";


interface Chat {
    id: string; // Chave única do serviço no Firebase
    UidEnviou:string;
    UidRecebeu:string;
    nomeEnviou:string;
    nomeRecebeu:string;
    text:string;
    timestamp:string
}


export default function ListaDeChats() {
    const navigate = useNavigate()
    const [chats, setChats] = useState<Chat[]>([]);

    async function recuperarChatsAbertos() {
        try {
            const userUid = auth.currentUser?.uid;
            const servicesRef = ref(database, "messages");
            const snapshot = await get(servicesRef);

            if (snapshot.exists()) {
                const allServices = snapshot.val();
                const userServices = Object.keys(allServices)
                .filter((key) => allServices[key].UidEnviou !== userUid && allServices[key].UidRecebeu === userUid )
                .map((key) => ({
                    id: key,
                    ...allServices[key],
                }));
                setChats(userServices);
            } else {
                console.log("Nenhum chat encontrado.");
                setChats([]);
            }
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    }
    recuperarChatsAbertos();
    return(
        <div>
            <Header/>
            <div>
                {chats.map(item => (
                    <div key={item.id} className="itemList">
                        <p>{item.UidEnviou}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}