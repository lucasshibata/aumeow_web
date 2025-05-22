import {auth, ref, database, get} from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from '../../contexts/LoginContext';
import './PaginaDeAdocao.css';
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { FaPlus } from "react-icons/fa";

interface AnimaisAdocao {
    Nome: string;
    Especie: string;
    Raca: string;
    Sexo:string;
    Idade:number;
    Porte:string;
    EstadoDeSaude: string;
    Temperamento: string;
    HistoriaDoAnimal: string;
    NomeResponsavel: string;
    EmailResponsavel: string;
    UIDCadastrante: string;
    EmailCadastrante: string; 
}

function PaginaDeAdocao(){
    const [adocao, setAdocao] = useState<AnimaisAdocao[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtroNome, setFiltroNome] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchServices = async () => {
            try {
            const userUid = auth.currentUser?.uid;
    
            if (!userUid) {
                console.error("Usuário não autenticado.");
                setLoading(false);
                return;
            }

            const servicesRef = ref(database, "adocao");
    
            const snapshot = await get(servicesRef);
    
            if (snapshot.exists()) {
                const allServices = snapshot.val();
    
                // Filtrar os serviços do usuário atual
                const animaisParaAdocao = Object.keys(allServices)
                    .filter((key) => allServices[key])
                    .map((key) => ({
                    id: key, // Inclui a chave como `id`
                    ...allServices[key],
                }));
    
                setAdocao(animaisParaAdocao); // Salva no estado
            } else {
                console.log("Nenhum serviço encontrado.");
            }
            } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            } finally {
            setLoading(false);
            }
        };
    
        fetchServices();
    }, []);
    
    if (loading) {
        return <p>Carregando...</p>;
    }
    const animaisFiltrados = adocao.filter((animal) =>
        animal.Nome.toLowerCase().includes(filtroNome.toLowerCase())
    );
    
    return(
        <div className="ContainerPaginaDeAdocao">
            <Header/>
            <div className="InnerContainerPaginaDeAdocao">
                <div className="DivBtnPaginaDeAdocao" onClick={()=>navigate("/CadastroDeAdocao")}>
                    <FaPlus className="IconBtnPaginaDeAdocao" /><button className="BtnIrParaCadastroPaginaDeAdocao">Cadastro De Adoção</button>
                </div>
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    className="InputFiltroNome"
                />
                <ul className="ContainerAdocaoPaginaDeAdocao">
                    {animaisFiltrados.map((service:any) => (
                        <li className="ItemListaPaginaDeAdocao" key={service.id}>
                            <h1 className="Textoh1PaginaDeAdocao">{service.Nome}</h1>
                            <p className="TextoPPaginaDeAdocao">Espécie: {service.Especie}</p>
                            <p className="TextoPPaginaDeAdocao">Raça: {service.Raca}</p>
                            <p className="TextoPPaginaDeAdocao">Sexo: {service.Sexo}</p>
                            <p className="TextoPPaginaDeAdocao">Idade: {service.Idade}</p>
                            <p className="TextoPPaginaDeAdocao">Estado De Saúde: {service.EstadoDeSaude}</p>
                            <p className="TextoPPaginaDeAdocao">Temperamento: {service.Temperamento}</p>
                            <p className="TextoPPaginaDeAdocao">História Do Animal: {service.HistoriaDoAnimal}</p>
                            <p className="TextoPPaginaDeAdocao">Nome do Responsável: {service.NomeResponsavel}</p>
                            <p className="TextoPPaginaDeAdocao">Email do Responsável: {service.EmailResponsavel}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(PaginaDeAdocao);