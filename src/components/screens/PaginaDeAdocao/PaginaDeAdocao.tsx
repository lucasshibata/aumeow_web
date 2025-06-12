import { auth, ref, database, get } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from '../../contexts/LoginContext';
import './PaginaDeAdocao.css';
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

interface AnimaisAdocao {
    Nome: string;
    Especie: string;
    Raca: string;
    Sexo: string;
    Idade: number;
    Porte: string;
    EstadoDeSaude: string;
    Temperamento: string;
    HistoriaDoAnimal: string;
    NomeResponsavel: string;
    EmailResponsavel: string;
    UIDCadastrante: string;
    EmailCadastrante: string;
}

function PaginaDeAdocao() {
    const [adocao, setAdocao] = useState<AnimaisAdocao[]>([]);
    const [loading, setLoading] = useState(true);

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroEspecie, setFiltroEspecie] = useState('');
    const [filtroRaca, setFiltroRaca] = useState('');
    const [filtroSexo, setFiltroSexo] = useState('');
    const [filtroIdade, setFiltroIdade] = useState('');

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
        animal.Nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        animal.Especie.toLowerCase().includes(filtroEspecie.toLowerCase()) &&
        animal.Raca.toLowerCase().includes(filtroRaca.toLowerCase()) &&
        animal.Sexo.toLowerCase().includes(filtroSexo.toLowerCase()) &&
        animal.Idade.toString().includes(filtroIdade.toLowerCase())
    );

    return (
        <div className="ContainerPaginaDeAdocao">
            <Header />
            <div className="InnerContainerPaginaDeAdocao">
                <div className="btnsInicioDaTelaPaginaDeAdocao">
                     <button className='BotaoVoltarPaginaDeAdocao' onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Voltar
                    </button>
                    <div className="DivBtnPaginaDeAdocao" onClick={() => navigate("/CadastroDeAdocao")}>
                        <FaPlus className="IconBtnPaginaDeAdocao" /> <p>Cadastro De Adoção</p>
                    </div>
                </div>
               
                <div className="DivContainerDeFiltrosPaginaDeAdocao">
                    <p className="TxtFiltroPaginaDeAdocao">Filtros:</p>
                    <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        className="InputFiltroNome"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por espécie"
                        value={filtroEspecie}
                        onChange={(e) => setFiltroEspecie(e.target.value)}
                        className="InputFiltroEspecie"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por raça"
                        value={filtroRaca}
                        onChange={(e) => setFiltroRaca(e.target.value)}
                        className="InputFiltroRaca"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por sexo"
                        value={filtroSexo}
                        onChange={(e) => setFiltroSexo(e.target.value)}
                        className="InputFiltroSexo"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por idade"
                        value={filtroIdade}
                        onChange={(e) => setFiltroIdade(e.target.value)}
                        className="InputFiltroIdade"
                    />
                </div>
                <ul className="ContainerAdocaoPaginaDeAdocao">
                    {animaisFiltrados.map((animal: any) => (
                        <li className="ItemListaPaginaDeAdocao" key={animal.id}>
                            <div className="HeaderCard">
                                <img className="imagemDoAnimalPaginaDeAdocao" src={`https://aumeow-images.s3.sa-east-1.amazonaws.com/adocoes/${animal.id}/imagemAdocao`} alt="" />
                                <h1 className="NomeAnimal">Nome: {animal.Nome}</h1>
                                <p className="EspecieRaça">{animal.Especie} - {animal.Raca}</p>
                            </div>

                            <div className="InfosGrid">
                                <p><strong>Sexo:</strong> {animal.Sexo}</p>
                                <p><strong>Idade:</strong> {animal.Idade}</p>
                                <p><strong>Saúde:</strong> {animal.EstadoDeSaude}</p>
                                <p><strong>Temperamento:</strong> {animal.Temperamento}</p>
                            </div>

                            <div className="HistoriaAnimal">
                                <p><strong>História:</strong></p>
                                <p>{animal.HistoriaDoAnimal}</p>
                            </div>

                            <div className="Responsavel">
                                <p><strong>Responsável:</strong> {animal.NomeResponsavel}</p>
                                <p><strong>Email:</strong> {animal.EmailResponsavel}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(PaginaDeAdocao);