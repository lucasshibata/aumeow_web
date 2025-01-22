import withAuth from '../contexts/AuthContext';
import {auth, ref, database, get} from "../firebase/Firebase";
import { useState, useEffect } from "react";

interface Product {
    id: string; // Chave única do serviço no Firebase
    marca: string;
    nome: string;
    preco: number;
    quantidade: number;
    userEmail: string;
    userName: string;
}

function ListaProdutosPrestador(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userUid = auth.currentUser?.uid;
        
                if (!userUid) {
                    console.error("Usuário não autenticado.");
                    setLoading(false);
                    return;
                }

                const productsRef = ref(database, "products");
        
                const snapshot = await get(productsRef);
        
                if (snapshot.exists()) {
                const allServices = snapshot.val();
        
                // Filtrar os serviços do usuário atual
                const userProducts = Object.keys(allServices)
                    .filter((key) => allServices[key].userUID === userUid)
                    .map((key) => ({
                    id: key, // Inclui a chave como `id`
                    ...allServices[key],
                    }));
        
                setProducts(userProducts); // Salva no estado
                } else {
                console.log("Nenhum serviço encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);

    if (loading) {
    return <p>Carregando...</p>;
    }

    if (products.length === 0) {
    return <p>Nenhum serviço encontrado.</p>;
    }

    return(
        <div className="ListaServicosPrestador">
            <ul>
            {products.map((service:any) => (
            <li key={service.id}>
                <h2>{service.userName}</h2>
                <p>Produto: {service.nome}</p>
                <p>Marca: {service.marca}</p>
                <p>Preço: {service.preco}</p>
                <p>quantidade: {service.quantidade}</p>
                <p>email de contato: {service.userEmail}</p>
            </li>
            ))}
            </ul>
        </div>
    )
}


export default withAuth(ListaProdutosPrestador);