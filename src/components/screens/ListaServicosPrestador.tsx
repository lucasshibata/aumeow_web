import {auth, ref, database, query, equalTo, orderByChild, get} from "../firebase/Firebase";

export default function ListaServicosPrestador(){
    function exercutar(){
        const userUID:any = auth.currentUser?.uid
        console.log(userUID)
        const servicesRef = ref(database, "services/");
        get(servicesRef)
        .then((snapshot)=>{
            if (snapshot.exists()) {
                const allServices = snapshot.val(); // Todos os serviços
                console.log("Todos os serviços:", allServices);
          
                // Filtrar serviços no lado do cliente
                const userServices = Object.keys(allServices)
                    .filter((key) => allServices[key].userUid === userUID) // Filtra pelo UID do usuário
                    .reduce((obj:any, key:any) => {
                    obj[key] = allServices[key]; // Recria o objeto com os serviços do usuário
                    return obj;
                  }, {});
          
                console.log("Serviços do usuário:", userServices);
            }else {
                console.log("Nenhum serviço encontrado.");
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar serviços:", error);
        });
    }
    
    return(
        <div className="ListaServicosPrestador">
            <button onClick={()=>exercutar()}>executar função</button>
        </div>
    )
}
