import ShopBox from '../layout/ShopBox';
import './Shopping.css'
import withAuth from '../contexts/AuthContext';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useState, useEffect } from "react";
import {auth, ref, database, get, onAuthStateChanged} from "../firebase/Firebase";
import { User } from "firebase/auth";

interface Product {
    id: string; // Chave única do serviço no Firebase
    marca: string;
    nome: string;
    preco: number;
    quantidade: number;
    userEmail: string;
    userName: string;
}

function Shopping (props:any){
    const {navigation} = props;
    const [product, setServices] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    // Verifica a autenticação do usuário
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
            setAuthChecked(true); // Finaliza a verificação de autenticação
        });
        return () => unsubscribe();
    }, []);

    // Busca os serviços após a autenticação
    useEffect(() => {
        const fetchServices = async () => {
            if (!user) {
                setLoading(false); // Finaliza o carregamento caso o usuário não esteja autenticado
                return;
            }

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
            } finally {
                setLoading(false); // Finaliza o carregamento independentemente do resultado
            }
        };

        if (authChecked) {
            fetchServices();
        }
    }, [authChecked, user]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!user) {
        return <div>Faça login</div>;
    }
    
    return(
        <div className='Shopping'>
            <Header/>
            <p>Loja</p>
            <div className="FlatList">
                {product.map(item => (
                    <div key={item.id} className="ContainerList">
                        <ShopBox titleProduct={item.nome} subtitleProduct={item.marca} 
                        priceProduct={item.preco} navegar={()=>navigation.navigate('EspecificProduct')}/>
                    </div>
                ))}
            <Footer/>
            </div>
        </div>
    );
};
export default withAuth(Shopping);