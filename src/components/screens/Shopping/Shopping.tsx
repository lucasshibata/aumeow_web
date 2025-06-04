import ShopBox from '../../layout/ShopBox';
import './Shopping.css'
import withAuth from '../../contexts/LoginContext';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { useState, useEffect } from "react";
import { ref, database, get } from "../../firebase/Firebase";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface Product {
    id: string; // Chave única do serviço no Firebase
    marca: string;
    nome: string;
    preco: string;
    quantidade: number;
    userEmail: string;
    userName: string;
}

function Shopping() {
    const navigate = useNavigate()
    const [product, setServices] = useState<Product[]>([]);

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroMarca, setFiltroMarca] = useState('');
    const [filtroPrecoMin, setFiltroPrecoMin] = useState('');
    const [filtroPrecoMax, setFiltroPrecoMax] = useState('');

    async function FetchProdutos() {
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
    useEffect(() => {
        FetchProdutos();
    }, []);

    useEffect(() => {
        console.log("Produtos carregados:", product);
    }, [product]);

    const produtosFiltrados = product.filter((produt) => {
        const preco = Number((produt.preco ?? "0").replace(',', '.')); // substitua por seu campo real

        const min = filtroPrecoMin === '' ? 0 : Number(filtroPrecoMin);
        const max = filtroPrecoMax === '' ? Infinity : Number(filtroPrecoMax);
        return (
            (produt.nome?.toLowerCase().includes(filtroNome.toLowerCase()) ?? false) &&
            (produt.marca?.toLowerCase().includes(filtroMarca.toLowerCase()) ?? false) &&
            preco >= min &&
            preco <= max
        );
    });
    return (
        <div className='Shopping'>
            <Header />
            <div className="DivContainerDeFiltrosShopping">
            <button className='BotaoVoltar' onClick={() => navigate(-1)}>
                <FaArrowLeft /> Voltar
            </button>
            <div className='DivContainerDeFiltrosShopping'>
            <h1 className="TxtTitleShopping">Página de Shopping</h1>
                <p className="TxtFiltroShopping">Filtros:</p>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    className="InputFiltroNome"
                />
                <input
                    type="text"
                    placeholder="Buscar por marca"
                    value={filtroMarca}
                    onChange={(e) => setFiltroMarca(e.target.value)}
                    className="InputFiltroMarca"
                />
                <input
                    type="number"
                    placeholder="Buscar por preço mínimo"
                    value={filtroPrecoMin}
                    onChange={(e) => setFiltroPrecoMin(e.target.value)}
                    className="InputFiltroPrecoMin"
                />
                <input
                    type="number"
                    placeholder="Buscar por preço máximo"
                    value={filtroPrecoMax}
                    onChange={(e) => setFiltroPrecoMax(e.target.value)}
                    className="InputFiltroPrecoMax"
                />
            </div>
            </div>
            <div className="FlatListShopping">
                {produtosFiltrados.map(item => (
                    <div key={item.id} className="itemListShopping">
                        <ShopBox imgProduct={`https://aumeow-images.s3.sa-east-1.amazonaws.com/${item.id}/imagemProduto`} titleProduct={item.nome} subtitleProduct={item.marca}
                            priceProduct={item.preco} navegar={() => navigate(`/Shopping/${item.id}`)} />
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};
export default withAuth(Shopping);