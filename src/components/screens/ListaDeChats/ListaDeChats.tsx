import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import {auth, database, ref, get} from "../../firebase/Firebase";
import withAuth from "../../contexts/LoginContext";
import "./ListaDeChats.css";


interface Chat {
    id: string; // Chave única do serviço no Firebase
    UidEnviou:string;
    UidRecebeu:string;
    nomeEnviou:string;
    nomeRecebeu:string;
    text:string;
    timestamp:string
}


function ListaDeChats() {
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
                }))
                .filter((item, index, self) => 
                    index === self.findIndex((t) => t.UidEnviou === item.UidEnviou) // Garante apenas um por UidEnviou
                );;
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
        <div className="ContainerListaDeChats">
            <Header/>
            <div className="InnerContainerListaDeChats">
                {chats.map(item => (
                    <div key={item.id} className="itemListListaDeChats">
                        <p className="TxtListaDeChats">{item.nomeEnviou}</p>
                        <button className="Button1ListaDeChats" onClick={()=>{navigate("/Chat/"+item.UidRecebeu+"/"+item.UidEnviou)}}>ir para o chat</button>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(ListaDeChats);