import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './PetServices.css';
import { auth, ref, database, get, onAuthStateChanged } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import withAuth from '../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface Service {
    id: string;
    endereco: string;
    preco: string;
    tipoAnimal: string;
    qtdService: number;
    userUid: string;
    nomePrestador: string;
    raio: string;
    experiencia: string;
    estado: string;
}

function PetServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const userId = auth.currentUser;

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroAnimalPref, setFiltroAnimalPref] = useState('');
    const [filtroPrecoMin, setFiltroPrecoMin] = useState('');
    const [filtroPrecoMax, setFiltroPrecoMax] = useState('');
    const [filtroRaioMin, setFiltroRaioMin] = useState('');
    const [filtroRaioMax, setFiltroRaioMax] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroQtdService, setFiltroQtdService] = useState('');

    const navigate = useNavigate();

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
                const servicesRef = ref(database, "services");
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

    function startChat(id: string) {
        navigate('/Chat/' + id + '/' + userId?.uid);
    }

    const servicosFiltrados = services.filter((servico) => {
        const preco = Number((servico.preco ?? "0").replace(',', '.')); // substitua por seu campo real
        const raio = Number(servico.raio ?? "0");

        const precoMin = filtroPrecoMin === '' ? 0 : Number(filtroPrecoMin);
        const precoMax = filtroPrecoMax === '' ? Infinity : Number(filtroPrecoMax);
        const raioMin = filtroRaioMin === '' ? 0 : Number(filtroRaioMin);
        const raioMax = filtroRaioMax === '' ? Infinity : Number(filtroRaioMax);
        return (
            servico.nomePrestador.toLowerCase().includes(filtroNome.toLowerCase()) &&
            servico.tipoAnimal.toLowerCase().includes(filtroAnimalPref.toLowerCase()) &&
            servico.estado.toLowerCase().includes(filtroEstado.toLowerCase()) &&
            servico.qtdService.toString().includes(filtroQtdService.toLowerCase()) &&
            preco >= precoMin &&
            preco <= precoMax &&
            raio >= raioMin &&
            raio <= raioMax
        )
    });
    return (
        <div className='PetServices'>
            <Header />
            <div className='ListaDeServicosPetServices'>
                <button className='BotaoVoltarPetServices' onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Voltar
                </button>
                <h1 className="TxtTitlePetServices">Lista de Pet Sitters</h1>
                <div className="DivContainerDeFiltrosPetServices">
                    <p className="TxtFiltroPetServices">Filtros:</p>
                    <input
                        type="text"
                        placeholder="Nome do Prestador:"
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        className="InputFiltroNome"
                    />
                    <input
                        type="text"
                        placeholder="Preferência de Animal:"
                        value={filtroAnimalPref}
                        onChange={(e) => setFiltroAnimalPref(e.target.value)}
                        className="InputFiltroAnimalPref"
                    />
                    <input
                        type="text"
                        placeholder="Preço Mínimo:"
                        value={filtroPrecoMin}
                        onChange={(e) => setFiltroPrecoMin(e.target.value)}
                        className="InputFiltroPrecoMin"
                    />
                    <input
                        type="text"
                        placeholder="Preço Máximo:"
                        value={filtroPrecoMax}
                        onChange={(e) => setFiltroPrecoMax(e.target.value)}
                        className="InputFiltroPrecoMax"
                    />
                    <input
                        type="number"
                        placeholder="Raio Mínimo:"
                        value={filtroRaioMin}
                        onChange={(e) => setFiltroRaioMin(e.target.value)}
                        className="InputFiltroRaioMin"
                    />
                    <input
                        type="number"
                        placeholder="Raio Máximo:"
                        value={filtroRaioMax}
                        onChange={(e) => setFiltroRaioMax(e.target.value)}
                        className="InputFiltroRaioMax"
                    />
                    <input
                        type="text"
                        placeholder="Estado (sigla):"
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        className="InputFiltroEstado"
                    />
                    <input
                        type="number"
                        placeholder="Quantidade de Serviços:"
                        value={filtroQtdService}
                        onChange={(e) => setFiltroQtdService(e.target.value)}
                        className="InputFiltroQtdService"
                    />
                </div>
                <ul className='InnerListaPetServices'>
                    {servicosFiltrados.map((service: Service) => (
                        <li className="ItemListaPetServices" key={service.id}>
                            <div className="HeaderPrestador">
                                <h2 className="NomePrestador">{service.nomePrestador}</h2>
                                <p className="Endereco">{service.endereco}</p>
                            </div>

                            <div className="InfosGridPrestador">
                                <p><strong>Preço:</strong> {service.preco}</p>
                                <p><strong>Animal Preferido:</strong> {service.tipoAnimal}</p>
                                <p><strong>Raio de Atendimento:</strong> {service.raio} Km</p>
                                <p><strong>Estado:</strong> {service.estado}</p>
                                <p><strong>Serviços Realizados:</strong> {service.qtdService}</p>
                            </div>
                            <div className="Experiencia">
                                <p><strong>Experiência:</strong></p>
                                <p>{service.experiencia}</p>
                            </div>

                            <button onClick={() => startChat(service.userUid)} className="BtnIniciarChat">
                                Iniciar Chat
                            </button>
                        </li>

                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}
export default withAuth(PetServices);