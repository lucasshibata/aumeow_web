import "./SobreNos.css";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

export default function SobreNos(){
    return(
        <div className="SobreNos">
            <Header/>
            <div className="ContainerSobreNos">
                <h1>Hello World!</h1>
            </div>
            <Footer/>
        </div>
    )
}