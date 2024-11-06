import React from "react";
import "./TelaInicial.css";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import cachorroGato from "../../assets/cachorro_e_gato.png";
import TouchableOpacity from "../layout/TouchableOpacity";

import navImg1 from "../../assets/banho_doguinho.png";
import navImg2 from "../../assets/corgi_vacina.png";
import navImg3 from "../../assets/cachorro_piscina.png";
import navImg4 from "../../assets/cachorro_grade.png";
import navImg5 from "../../assets/dog_loja.png";

export default function TelaInicial(){
    const data = [
        { id:1, titleNav: 'Banho e tosa', srcImg:navImg1, navegacao:'soos'},
        { id:2, titleNav: 'Vacinação', srcImg:navImg2, navegacao:'soos' },
        { id:3, titleNav: 'Hospedagem', srcImg:navImg3, navegacao:'soos' },
        { id:4, titleNav: 'Denúncia', srcImg:navImg4, navegacao:'soos' },
        { id:5, titleNav: 'Lojinha', srcImg:navImg5, navegacao:'soos' },
    ];
    const navigate = useNavigate();
    function função_qualquer(){
        
    }
    return(
        <div className="TelaInicial">
            <Header/>
            <main>
                {/* =============================================================== */}
                <article className="Article1">
                    <div className="Div1">
                        <h1>Cuidando dos nosso pequenos amigos</h1>
                        <p>Seja bem vindo ao AuMeow, o seu site de cuidados para o seu melhor amigo.
                        Aproveite nossos serviços</p>
                        <button className="btn_div1">Fique por dentro</button>
                    </div>
                    <div>
                        <img src={cachorroGato} alt="imagem de cachorro e gato" />
                    </div>
                </article>
                {/* =============================================================== */}
                <article className="Article2">
                    <h1>Como podemos te ajudar hoje?</h1>
                    <div className="FlatList">
                        {/* {data.map(item => (
                            <div key={item.id}>
                                <TouchableOpacity onClick={()=>navigate(item.navegacao)}>
                                    <img src={item.srcImg} alt={item.titleNav} style={{ width: 338, height: 338 }}/>
                                    <p className="tituloImgMenu">{item.titleNav}</p>
                                </TouchableOpacity>
                            </div>
                        ))} */}
                        {data.map(item => (
                            <div key={item.id} className="card">
                                <div className="card-inner">
                                    <div className="card-front">
                                        <img src={item.srcImg} alt={item.titleNav} />
                                        <p className="tituloImgMenu">{item.titleNav}</p>
                                    </div>
                                    <div className="card-back">
                                        <p>Mais detalhes sobre {item.titleNav}</p> {/* Conteúdo do VERSO do card */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
                {/* =============================================================== */}
                <article className="Article3">
                    <div className="Div2">
                        <h1>Sobre nós</h1>
                    </div>
                </article>
            </main>
            <Footer/>
        </div>
        
    )
}