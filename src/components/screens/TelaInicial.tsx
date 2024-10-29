import React from "react";
import "./TelaInicial.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import image from "../../assets/cachorro_e_gato.png";
import image2 from "../../assets/dog-walk.jpg";

export default function TelaInicial(){
    const data = [
        { id:1, titleNav: 'Banho e tosa', srcImg:image2},
        { id:2, titleNav: 'Vacinação', srcImg:image2 },
        { id:3, titleNav: 'Hospedagem', srcImg:image2 },
        { id:4, titleNav: 'Denúncia', srcImg:image2 },
        { id:5, titleNav: 'Lojinha', srcImg:image2 },
    ];
    return(
        <div className="TelaInicial">
            <Header/>
            <main>
                {/* ==================================================== */}
                <article className="Article1">
                    <div className="Div1">
                        <h1>Cuidando dos nosso pequenos amigos</h1>
                        <p>Seja bem vindo ao AuMeow, o seu site de cuidados para o seu melhor amigo.
                        Aproveite nossos serviços</p>
                        <button className="btn_div1">Fique por dentro</button>
                    </div>
                    <div>
                        <img src={image} alt="imagem de cachorro e gato" />
                    </div>
                </article>
                {/* =============================================================== */}
                <article className="Article2">
                    <h1>Como podemos te ajudar hoje?</h1>
                    <div className="FlatList">
                        {data.map(item => (
                            <div key={item.id} className="ContainerList">
                                <img src={item.srcImg} alt={item.titleNav} style={{ width: 338, height: 338, marginRight: 10 }}/>
                                {item.titleNav}
                            </div>
                        ))}
                    </div>
                </article>
            </main>
            <Footer/>
        </div>
        
    )
}