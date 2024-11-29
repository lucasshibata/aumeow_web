import {database, ref, set, auth, get} from '../firebase/Firebase'

export default async function SendService(data:any, navigation:any){
    const user = auth.currentUser
    const databaseRef = ref(database, 'services/'+user?.uid);
    const dbUserRef = ref(database, 'users/'+user?.uid+'/nome')
    get(dbUserRef).then((snapshot)=>{
        if (snapshot.exists()) {
            const nomep = snapshot.val(); // Recupera o valor do campo "nome"
            const serviceData ={
                endereco: data.adress,
                preco: data.price,
                tipoAnimal: data.animalType,
                qtdService: data.qtdService,
                userUid: user?.uid,
                nomePrestador: nomep
            }
            set(databaseRef, serviceData)
            .then(()=>{
                alert("serviço criado com sucesso");
                navigation('/MenuPrestador')
            })
            .catch((error:any)=>{
                alert(error.code);
            })
        } else {
            console.log("Nenhum dado encontrado.");
        }
    })
    .catch((error) => {
        console.error("Erro ao acessar o banco de dados:", error);
    });
}