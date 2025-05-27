import {database, ref, set, auth, get, push} from '../firebase/Firebase'

export default async function SendService(data:any, navigation:any){
    const user = auth.currentUser
    const databaseRef = ref(database, 'services/');
    const dbUserNameRef = ref(database, 'users/'+user?.uid+'/nome');
    const dbUserRaioRef = ref(database, 'users/'+user?.uid+'/raioAtendimento');
    const dbUserAnimalPrefRef = ref(database, 'users/'+user?.uid+'/animalPreferencia');
    const dbUserExperienciaRef = ref(database, 'users/'+user?.uid+'/experiencia');

    const snapshot1 = await get(dbUserRaioRef);
    const snapshot2 = await get(dbUserExperienciaRef);
    const snapshot3 = await get(dbUserAnimalPrefRef);

    const newServiceRef = push(databaseRef);
    get(dbUserNameRef).then((snapshot)=>{
        if (snapshot.exists()) {
            const nomep = snapshot.val(); // Recupera o valor do campo "nome"
            const serviceData ={
                endereco: data.adress,
                preco: data.price.replace(',', '.'),
                tipoAnimal: snapshot3.val(),
                qtdService: data.qtdService,
                userUid: user?.uid,
                raio: snapshot1.val(),
                experiencia: snapshot2.val(),
                estado: data.estado,
                nomePrestador: nomep
            }
            set(newServiceRef, serviceData)
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