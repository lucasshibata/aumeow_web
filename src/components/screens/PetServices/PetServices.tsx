import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './PetServices.css';
import { auth, ref, database, get, onAuthStateChanged } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import withAuth from '../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

interface Service {
    id: string;
    endereco: string;
    preco: number;
    tipoAnimal: string;
    qtdService: number;
    userUid: string;
    nomePrestador: string;
}

function PetServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [filtroNome, setFiltroNome] = useState('');
    const userId = auth.currentUser;

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

    function startChat(id:string){
        navigate('/Chat/'+id+'/'+userId?.uid);
    }

    const servicosFiltrados = services.filter((servico) =>
        servico.nomePrestador.toLowerCase().includes(filtroNome.toLowerCase())
    );
    return (
        <div className='PetServices'>
            <Header/>
            <div className='ListaDeServicosPetServices'>
                <h1>Lista de Pet Sitters</h1>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    className="InputFiltroNome"
                />
                <ul className='InnerListaPetServices'>
                    {servicosFiltrados.map((service: Service) => (
                        <li className='ItemLista' key={service.id}>
                            <h2 className='Texto'>{service.nomePrestador}</h2>
                            <p className='Texto'>Endereço: {service.endereco}</p>
                            <p className='Texto'>Preço: {service.preco}</p>
                            <p className='Texto'>Animal: {service.tipoAnimal}</p>
                            <p className='Texto'>Quantidade de Serviços: {service.qtdService}</p>
                            <button onClick={()=>startChat(service.userUid)}>iniciar chat</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </div>
    );
}
export default withAuth(PetServices);