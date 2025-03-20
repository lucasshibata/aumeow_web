import { useEffect, useState } from 'react';
import { ref, database, get, set} from "../../firebase/Firebase";
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './EspecificProduct.css';
import { useForm } from 'react-hook-form';
import withAuth from '../../contexts/LoginContext';

interface Product {
    id: string; // Chave única do serviço no Firebase
    marca: string;
    nome: string;
    preco: number;
    quantidade: number;
    userEmail: string;
    userName: string;
}

function EspecificProduct() {
    const {register, handleSubmit} = useForm();
    
    async function realizarPedido(data:any) {
        const productRef = ref(database, `products/${ProdId}/quantidade`);
        const novaQtd = Number(getProduct?.quantidade) - data.quantidade;
        await set(productRef, `${novaQtd}`).then(()=>{
            alert("pedido feito com sucesso");
            window.location.reload()
        })
        .catch((error:any)=>{
            alert(error.code);
        })
    
    }
    const { ProdId } = useParams();
    const [getProduct, setProduct] = useState<Product>();
    useEffect(() => {
        async function fetchProduct() {
            try {
                const productRef = ref(database, `products/${ProdId}`);
                const snapshot = await get(productRef);
                if (snapshot.exists()) {
                    const productSingle = snapshot.val();
                    console.log(productSingle)
                    setProduct({ id: snapshot.key, ...productSingle })
                } else {
                    console.log("Nenhum produto encontrado.");
                }
            } catch (error) {
                    console.error("Erro ao buscar produto:", error);
            }
        }
        if (ProdId) fetchProduct();
    }, [ProdId]);
    
    return (
        <div className='EspecificProduct'>
            <Header/>
            <div className='Container'>
                <div style={{width:'400 px', height:'1px'}}></div>
                {getProduct &&
                    <div key={getProduct.id} className="ContainerList">
                        <img className='imageProduct' src={require("../../../assets/Teste_img_racao.jpg")} alt="imagem do produto" />
                        <p className='textProduct'>Nome do produto: {getProduct.nome}</p>
                        <p className='textProduct'>Marca do Produto: {getProduct.marca}</p>
                        <p className='textProduct'>Preço do produto: R${getProduct.preco}</p>
                        <p className='textProduct'>Quantidade em estoque: {getProduct.quantidade}</p>
                    </div>
                }
                <div className='confirmacaoPedido'>
                    <div className='boxContainer'>
                        <h1 className='confirmacaoTxt'>Confirmação do pedido</h1>
                        <form onSubmit={handleSubmit((data)=>realizarPedido(data))}>
                            <label className='confirmacaoTxt'>Quantidade de produtos: </label>
                            <input type="number" placeholder='Quantidade:' {...register("quantidade")}/>
                            <input className='Submit' value='Enviar' type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default withAuth(EspecificProduct);