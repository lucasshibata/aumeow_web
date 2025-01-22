import {database, ref, set, get} from '../firebase/Firebase';

export default async function ProductRegistration(data:any, navigation:any) {
    const productRef = ref(database, 'products/'+data.code);
    const productData ={
        nome: data.name,
        codigo: data.code,
        quantidade: data.amount,
        preco: data.price,
        marca: data.brand
    }
    try {
        // Verifica se o código já existe no banco de dados
        await get(productRef).then((snapshot)=>{
            if (snapshot.exists()) {
                // Se o código já existe, retorne um aviso de erro
                alert(`O código "${data.code}" já existe. Escolha outro.`);
            }else{
                set(productRef, productData)
                .then(()=>{
                    alert("produto criado com sucesso e salvo no banco");
                    // navigation('/Login')
                })
                .catch((error:any)=>{
                    alert(error.code);
                })
            }
        });  
    } catch (error) {
        console.error("Erro ao adicionar o produto:", error);
        alert("Erro ao adicionar o produto. Tente novamente.");
    } 
}