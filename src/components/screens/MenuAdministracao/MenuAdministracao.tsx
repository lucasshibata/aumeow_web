import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import "./MenuAdministracao.css"

export default function MenuAdministracao(){
    return(
        <div className="Container">
            <Header/>
            <div className="innerContainer">
                <h1>Menu administração</h1>
            </div>
            <Footer/>
        </div>
    )
}