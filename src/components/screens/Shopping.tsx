import ShopBox from '../layout/ShopBox';
import './Shopping.css'
import withAuth from '../contexts/AuthContext';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useState } from "react";
import { ref, database, get} from "../firebase/Firebase";
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string; // Chave única do serviço no Firebase
    marca: string;
    nome: string;
    preco: number;
    quantidade: number;
    userEmail: string;
    userName: string;
}

function Shopping (){
    const navigate = useNavigate()
    const [product, setServices] = useState<Product[]>([]);

    async function qualquercoisa() {
        try {
            const servicesRef = ref(database, "products");
            const snapshot = await get(servicesRef);

            if (snapshot.exists()) {
                const allServices = snapshot.val();
                const userServices = Object.keys(allServices).map((key) => ({
                    id: key,
                    ...allServices[key],
                }));
                setServices(userServices);
            } else {
                console.log("Nenhum serviço encontrado.");
                setServices([]);
            }
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    }
    qualquercoisa();
    return(
        <div className='Shopping'>
            <Header/>
            <div className="FlatList">
                {product.map(item => (
                    <div key={item.id} className="itemList">
                        <ShopBox imgProduct = {require("../../assets/Teste_img_racao.jpg")} titleProduct={item.nome} subtitleProduct={item.marca} 
                        priceProduct={item.preco} navegar={()=>navigate(`/Shopping/${item.id}`)}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};
export default withAuth(Shopping);