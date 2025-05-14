import "./SobreNos.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import navImg4 from "../../../assets/animais_felizes.png";

export default function SobreNos(){
    return(
        <div className="ContainerSobreNos">
            <Header/>
            <div className="InnercontainerSobreNos">
                <article className="Article1SobreNos">
                    <img className="Img1SobreNos" src={navImg4} alt="" />
                    <p>Quem está por trás do AuMeow?</p>
                    <img className="Img2SobreNos" src={navImg4} alt="" />
                </article>
                <article className="Article2SobreNos">
                    <div className="DivInterna1SobreNos">
                        <img className="Img3SobreNos" src={navImg4} alt="" />
                        <p> Somos um grupo de desenvolvedores e alunos do curso de Ciências da Computação, do CEUB, nosso principal objetivo com esta aplicação Web/Aplicativo 
                            é nos capacitar no desenvolvimento Web e Mobile com a utilização de ferramentas como Figma, Trello, HTML/CSS, React Web, Firebase, nuvem da 
                            AWS(Amazon Web Services).
                        </p>
                    </div>
                    <div className="DivInterna2SobreNos">
                        <p> Nossa equipe preza pelo bem dos animais, e com isso surge a ideia deste projeto, com o proposito de unificar todas as necessidades de um dono de pets 
                            em um único lugar, permitindo auxiliar nas buscas de serviços, produtos e auxilio profissional, além de auxiliar no controle dos cuidados de seus animais, 
                            como consultas veterinárias, agendamento de vacinação, banho e tosa, serviços de passeio, sistema de adoção e um canal para denuncias.</p>
                        <img className="Img4SobreNos" src={navImg4} alt="" />
                    </div>
                </article>
                <button className="Btn1SobreNos">Saiba mais sobre nossas redes sociais</button>
            </div>
            <Footer/>
        </div>
    )
}