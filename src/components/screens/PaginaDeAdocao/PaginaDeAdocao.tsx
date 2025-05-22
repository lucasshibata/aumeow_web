import {auth, ref, database, get} from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from '../../contexts/LoginContext';
import './PaginaDeAdocao.css';
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

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
          
    return(
        <div className="ContainerPaginaDeAdocao">
            <Header/>
            <div className="InnerContainerPaginaDeAdocao">
                <button onClick={()=>navigate("/CadastroDeAdocao")}>Cadastro De Adoção</button>
                <ul className="ContainerServicos">
                    {adocao.map((service:any) => (
                        <li className="ItemLista" key={service.id}>
                            <h2 className="Textoh2">{service.Nome}</h2>
                            <p className="TextoP">Espécie: {service.Especie}</p>
                            <p className="TextoP">Raça: {service.Raca}</p>
                            <p className="TextoP">Sexo: {service.Sexo}</p>
                            <p className="TextoP">Idade: {service.Idade}</p>
                            <p className="TextoP">Estado De Saúde: {service.EstadoDeSaude}</p>
                            <p className="TextoP">Temperamento: {service.Temperamento}</p>
                            <p className="TextoP">História Do Animal: {service.HistoriaDoAnimal}</p>
                            <p className="TextoP">Nome do Responsável: {service.NomeResponsavel}</p>
                            <p className="TextoP">Email do Responsável: {service.EmailResponsavel}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer/>
        </div>
    )
}

export default withAuth(PaginaDeAdocao);