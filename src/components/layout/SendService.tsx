import {database, ref, set} from '../firebase/Firebase'

export default async function SendService(data:any, navigation:any){
    const databaseRef = ref(database, 'services/');
    const serviceData ={
        endereco: data.adress,
        preco: data.price,
        tipoAnimal: data.animalType,
        qtdService: data.qtdService
    }

    set(databaseRef, serviceData)
    .then(()=>{
        alert("serviço criado com sucesso");
        navigation('/Login')
    })
    .catch((error:any)=>{
        alert(error.code);
    })
}