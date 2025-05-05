import {auth, database, ref, set} from '../firebase/Firebase';
import s3 from '../aws/aws-config';

interface Data{
    nome: string,
    cpf: string,
    senha: string,
    genero: string
    dtNascimento: string,
    endereco:string,
    telefone:string,
    funcao: string,
    nomeDoPet: string,
    especie: string,
    tipoAnimal: string,
    experiencia: string,
    raioAtendimento: string,
    animalPreferencia: string
}

export default async function EditProfile(data:any, navigation:any, type:string, file:any) {
    // if (data.password === data.passwordAgain){
        if (!file) {
            alert('Por favor, selecione uma imagem.');
        } else{
            try {
                const user = auth.currentUser?.uid;
                    
                    const userRef = ref(database, 'users/'+user);
                    const userData:Data ={
                        nome: data.name || "N/a",
                        cpf: data.cpf || "N/a",
                        senha: data.password || "N/a",
                        genero: data.gender || "N/a",
                        dtNascimento: data.dtNascimento || "N/a",
                        endereco:data.endereco || "N/a",
                        telefone:data.telefone || "N/a",
                        funcao: type || "N/a",
                        nomeDoPet: data.nomeDoPet || "N/a",
                        especie: data.especie || "N/a",
                        tipoAnimal: data.tipoAnimal || "N/a",
                        experiencia: data.experiencia || "N/a",
                        raioAtendimento: data.raioAtendimento || "N/a",
                        animalPreferencia: data.animalPreferencia || "N/a"
                    }

                    set(userRef, userData)
                    .then(()=>{
                        alert("conta criada com sucesso e salvo no banco");
                    })
                    .catch((error:any)=>{
                        alert(error.code);
                    });

                    s3.upload({
                        Bucket: 'aumeow-images',
                        Key: `imagensPerfil/${user}/imagemDono`,
                        Body: file,
                        ContentType: file.type,
                    }).promise();

                    alert('Conta criada com sucesso!');
                    console.log('Arquivos enviados com sucesso');
                    navigation('/Login');
                    
            } catch (error) {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar Conta. Tente novamente.');
            }
        }
    // } else {
    //     alert('senha de confirmação está incorreta, insira novamente!');
    // }
}