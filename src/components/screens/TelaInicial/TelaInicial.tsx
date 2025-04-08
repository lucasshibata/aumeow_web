import "./TelaInicial.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import cachorroGato from "../../../assets/cachorro_e_gato.png";
// import navImg1 from "../../assets/banho_doguinho.png";
// import navImg2 from "../../assets/corgi_vacina.png";
// import navImg3 from "../../assets/cachorro_piscina.png";
// import navImg4 from "../../assets/cachorro_grade.png";
import navImg5 from "../../../assets/dog_loja.png";
import navImg6 from "../../../assets/dog-walk.jpg";
import { useNavigate } from "react-router-dom";

export default function TelaInicial(){
    const data = [
        { id:1, titleNav: 'Passeios', srcImg:navImg6, detalhes:"detalhes sobre Passeios" },
        { id:2, titleNav: 'Loja', srcImg:navImg5, detalhes:"detalhes sobre a Loja" },
        // { id:3, titleNav: 'Vacinação', srcImg:navImg2, detalhes:"detalhes sobre vacinação" },
        // { id:4, titleNav: 'Denúncia', srcImg:navImg4, detalhes:"detalhes sobre Denúncia" },
        // { id:5, titleNav: 'Hospedagem', srcImg:navImg3, detalhes:"detalhes sobre Hospedagem" },
        // { id:6, titleNav: 'Banho e tosa', srcImg:navImg1, detalhes:"detalhes sobre banho e tosa" },
        
    ];
    const navigate = useNavigate()
    return(
        <div className="TelaInicial">
            <div className="overlay"></div>
            <div className="ConteudoTelaInicial">
                <Header/>
                <main>
                    {/* =============================================================== */}
                    <article className="Article1TelaInicial">
                        <div className="Div1TelaInicial">
                            <h1>Cuidando dos nosso pequenos amigos</h1>
                            <p>Seja bem vindo ao AuMeow, o seu site de cuidados ideal para o seu melhor amigo.
                            Aproveite nossos serviços</p>
                            <button className="btn_div1" onClick={()=>navigate("/Login")}>Fique por dentro</button>
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
                                <img src={require("../../../assets/cachorro_piscina.png")} alt="imagem1" />
                                <p>Encontre abrigos e centros de adoção próximos, 
                                    conectando você a uma gama de animais adoráveis 
                                    esperando por um lar amoroso. Explore perfis e descubra 
                                    quem está pronto para se tornar o novo membro da sua família.</p>
                            </div>
                            <div className="InerContainerTelaInicial">
                                <p>Encontre abrigos e centros de adoção próximos, 
                                    conectando você a uma gama de animais adoráveis 
                                    esperando por um lar amoroso. Explore perfis e descubra 
                                    quem está pronto para se tornar o novo membro da sua família.</p>
                                <img src={require("../../../assets/cachorro_piscina.png")} alt="imagem2" />
                            </div>
                        </div>
                    </article>     
                </main>
                <Footer/>
            </div>
        </div>
    )
}