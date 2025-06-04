import "./SobreNos.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import navImg1 from "../../../assets/gatinho_desenho_sobre_nos.png";
import navImg2 from "../../../assets/imagem_time_desenvolvedores.jpg";
import navImg3 from "../../../assets/gatos_comendo_sobre_nos.png";
import navImg4 from "../../../assets/imagem_equipe_sobre_nos.png";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SobreNos() {
    const navigate = useNavigate()
    function mandarParaInstagram() {
        window.location.href = "https://www.instagram.com/aumeow.pets/";
    }
    return (
        <div className="ContainerSobreNos">
            <Header />
            <div className="InnercontainerSobreNos">
                <button className='BotaoVoltar' onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Voltar
                </button>
                <article className="Article1SobreNos">
                    <div className="DivContainerMiniImg">
                        <img className="Img1SobreNos" src={navImg1} alt="" />
                    </div>
                    <p className="TituloArticle1SobreNos">Quem está por trás do AuMeow?</p>
                    <div className="DivContainerMiniImg2">
                        <img className="Img2SobreNos" src={navImg4} alt="" />
                    </div>
                </article>
                <article className="Article2SobreNos">
                    <div className="DivInterna1SobreNos">
                        <img className="Img3SobreNos" src={navImg2} alt="" />
                        <p> Somos um grupo de desenvolvedores e alunos do curso de Ciências da Computação, do CEUB, nosso principal objetivo com esta aplicação Web/Aplicativo
                            é nos capacitar no desenvolvimento Web e Mobile com a utilização de ferramentas como Figma, Trello, HTML/CSS, React Web, Firebase, nuvem da
                            AWS(Amazon Web Services).
                        </p>
                    </div>
                    <div className="DivInterna2SobreNos">
                        <p> Nossa equipe preza pelo bem dos animais, e com isso surge a ideia deste projeto, com o proposito de unificar todas as necessidades de um dono de pets
                            em um único lugar, permitindo auxiliar nas buscas de serviços, produtos e auxilio profissional, além de auxiliar no controle dos cuidados de seus animais,
                            como consultas veterinárias, agendamento de vacinação, banho e tosa, serviços de passeio, sistema de adoção e um canal para denuncias.</p>
                        <img className="Img4SobreNos" src={navImg3} alt="" />
                    </div>
                </article>
                <button onClick={() => mandarParaInstagram()} className="Btn1SobreNos">Venha conhecer nossas redes sociais</button>
            </div>
            <Footer />
        </div>
    )
}