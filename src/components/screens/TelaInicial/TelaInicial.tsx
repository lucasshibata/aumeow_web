import "./TelaInicial.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import cachorroGato from "../../../assets/cachorro_e_gato.png";
import navImg1 from "../../../assets/dog-walk.jpg";
import navImg2 from "../../../assets/shop-img.png";
import navImg3 from "../../../assets/imagem_adocao.jpg";
import navImg4 from "../../../assets/cachorro_grade.png";
import { useNavigate } from "react-router-dom";

export default function TelaInicial(){
    const data = [
        { id:1, titleNav: 'Pet Sitter', srcImg:navImg1, detalhes:"Esse serviço permite que tutores agendem cuidados para seus pets com profissionais confiáveis, garantindo bem-estar na sua ausência. Oferece serviços como alimentação, passeios, administração de medicamentos e higiene, além de exibir disponibilidade, preços e avaliações, permitindo o acompanhamento do atendimento." },
        { id:2, titleNav: 'Loja', srcImg:navImg2, detalhes:"Esse serviço permite que os clientes naveguem facilmente por categorias de produtos para animais, como ração, brinquedos, acessórios e itens de higiene. É possível pesquisar por nome, filtrar por tipo de pet, marca ou preço, visualizar detalhes do produto e adicionar ao carrinho com apenas alguns cliques. A experiência é otimizada para garantir praticidade, segurança na compra do cliente." },
        { id:3, titleNav: 'Denúncia', srcImg:navImg4, detalhes:"Esse serviço é dedicado à proteção animal, permitindo que os usuários denunciem casos de maus-tratos de forma anônima e segura. O sistema coleta informações, fotos ou vídeos e encaminha automaticamente os dados às autoridades ou ONGs responsáveis, garantindo agilidade e sigilo no processo." },
        { id:4, titleNav: 'Adoção', srcImg:navImg3, detalhes:"Esse serviço é dedicado a adoção de animais, facilitando a conexão entre abrigos e pessoas interessadas em adotar. Ele permite que os abrigos cadastrem animais disponíveis, com informações como nome, espécie, idade, porte e histórico médico. Usuários podem visualizar os animais, filtrar por critérios específicos e enviar pedidos de adoção. O sistema inclui etapas de triagem, como formulários e entrevistas, para garantir adoções responsáveis." },  
    ];
    const navigate = useNavigate()
    return(
        <div className="TelaInicial">
            
            <div className="ConteudoTelaInicial">
                <Header/>
                <main>
                    {/* =============================================================== */}
                    <article className="Article1TelaInicial">
                        <div className="Div1TelaInicial">
                            <h1>Cuidando dos nossos pequenos amigos</h1>
                            <p>Seja bem vindo ao AuMeow, o seu site de cuidados ideal para o seu melhor amigo.
                            Aproveite nossos serviços</p>
                            <button className="btn_div1" onClick={()=>navigate("/SobreNos")}>Fique por dentro</button>
                        </div>
                        <div className="imgDogCat">
                            <img src={cachorroGato} alt="imagem de cachorro e gato" style={{flex:1, width:'100%', height:'100%'}}/>
                        </div>
                    </article>
                    {/* =============================================================== */}
                    <article className="Article2TelaInicial">
                        <h1 className="tituloArt2">Como podemos te ajudar hoje?</h1>
                        <div className="FlatList">
                            {data.map(item => (
                                <div key={item.id} className="card">
                                    <div className="card-inner">
                                        <div className="card-front">
                                            <img src={item.srcImg} alt={item.titleNav} />
                                            <p className="tituloImgMenu">{item.titleNav}</p>
                                        </div>
                                        <div className="card-back">
                                            <p>{item.detalhes}</p> 
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="Div2TelaInicial">
                            <h1 className="tituloSobre">Sobre o AuMeow</h1>
                            <div className="InerContainerTelaInicial">
                                <img className="imagemSobreTelaInicial" src={require("../../../assets/animais_felizes.png")} alt="imagem1" />
                                <div className="DivSobreNosTelaInicial">
                                    <p>O projeto AuMeow é uma iniciativa para agrupar todas as necessidades
                                    de donos de pets em um único lugar, com o intúito de trazer o melhor
                                    de todos os serviços, trazendo produtos, lojas e empresas que melhor
                                    atendem seu(s) animal(is), venha com a gente e desfrute de tudo que 
                                    a AuMeow pode fazer por você.</p>
                                </div>
                            </div>
                            <div className="InerContainerTelaInicial">
                                <div className="DivSobreNosTelaInicial">
                                    <p>Encontre abrigos e centros de adoção próximos, 
                                    conectando você a uma gama de animais adoráveis 
                                    esperando por um lar amoroso. Explore perfis e descubra 
                                    quem está pronto para se tornar o novo membro da sua família.</p>
                                </div>
                                <img className="imagemSobreTelaInicial" src={require("../../../assets/cachorro_piscina.png")} alt="imagem2" />
                            </div>
                                    <button className="BtnSobreNosTelaInicial" onClick={()=>navigate("/SobreNos")}>Conheça mais Sobre Nós</button>
                        </div>
                    </article>     
                </main>
                <Footer/>
            </div>
        </div>
    )
}