import withAuth from '../contexts/AuthContext';
import {auth, ref, database, get} from "../firebase/Firebase";
import { useState, useEffect } from "react";
import "./ListaProdutosPrestador.css";
import Header from '../layout/Header';
import Footer from '../layout/Footer';

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
                    .filter((key) => allServices[key].prestadorUID === userUid)
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
        <div className='ListaServicosPrestador'>
            <Header/>
            <ul className='ContainerProdutos'>
                {products.map((service:any) => (
                    <li className='ItemLista' key={service.id}>
                        <img src={`https://aumeow-images.s3.sa-east-1.amazonaws.com/${service.id}/imagemProduto`} alt="imagem do produto" />
                        <h2 className='Textoh2'>{service.nome}</h2>
                        <p className='TextoP'>Marca: {service.marca}</p>
                        <p className='TextoP'>Preço: {service.preco}</p>
                        <p className='TextoP'>quantidade: {service.quantidade}</p>
                        <p className='TextoP'>email de contato: {service.prestadorEmail}</p>
                    </li>
                ))}
            </ul>
            <Footer/>
        </div>
    )
}


export default withAuth(ListaProdutosPrestador);