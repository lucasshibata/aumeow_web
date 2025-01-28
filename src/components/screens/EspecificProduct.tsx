import { useEffect, useState } from 'react';
import { ref, database, get} from "../firebase/Firebase";
import { useParams } from 'react-router-dom';

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
      <div>
        {getProduct &&
            <div key={getProduct.id} className="ContainerList">
            <p>{getProduct.nome}</p>
          </div>
        }
      </div>
    );
}
export default EspecificProduct;