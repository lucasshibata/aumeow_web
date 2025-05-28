import { database, get, ref, auth } from "../firebase/Firebase";

async function verifyFunction() {
    try {
        const user = auth.currentUser;
        const userRef = ref(database, `users/${user?.uid}/funcao`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const funcao = snapshot.val();
            
            switch (funcao){
                case "prestador":
                    return "prestador"
                case "administrador":
                    return "administrador"
                case "cliente":
                    return "cliente"
                default:
                    return "não encontrado"
            }
        }
    } catch(error) {
        console.error("Erro ao buscar função do usuário:", error);
    }
}

export default verifyFunction;