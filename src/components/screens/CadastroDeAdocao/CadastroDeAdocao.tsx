import { useState, useRef } from "react";
import { ref, database, auth, get, set, push} from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

interface AdocaoData {
    Nome: string;
    Especie: string;
    Raca: string;
    Sexo:string;
    Idade:number;
    Porte:string;
    EstadoDeSaude: string;
    Temperamento: string;
    HistoriaDoAnimal: string;
    NomeResponsavel: string;
    UIDResponsavel: string;
    EmailResponsavel: string; 
}

export default function CadastroDeAdocao(){
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);;
    
    const handleFileChange = (e:any) => {
        if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
          const imageUrl = URL.createObjectURL(e.target.files[0]);
          setImagePreview(imageUrl);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
          } // abre o seletor de arquivos
    };

    const onSubmit = async (data: any) => {
        if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
        }

        setUploading(true);

        const user = auth.currentUser;
        const productRef = push(ref(database, 'adocao')); //resolver codigo que vai ser usado como referência
        const dbUserNameRef = ref(database, 'users/' + user?.uid + '/nome');
        const dbUserEmailRef = ref(database, 'users/' + user?.uid + '/email');

        // Declare productData com a interface ProductData
        let AdocaoData: AdocaoData = {
            Nome: data.nome,
            Especie: data.especie,
            Raca: data.raca,
            Sexo:data.sexo,
            Idade:data.idade,
            Porte:data.porte,
            EstadoDeSaude: data.estadoDeSaude,
            Temperamento: data.temperamento,
            HistoriaDoAnimal: data.historiaDoAnimal,
            NomeResponsavel: '',
            UIDResponsavel: user?.uid || '',
            EmailResponsavel: data.email
        };

        try {
        // Obtém o nome do usuário
        const userNameSnapshot = await get(dbUserNameRef);
        if (userNameSnapshot.exists()) {
            AdocaoData.NomeResponsavel = userNameSnapshot.val();
        }

        // Obtém o email do usuário
        const userEmailSnapshot = await get(dbUserEmailRef);
        if (userEmailSnapshot.exists()) {
            AdocaoData.EmailResponsavel = userEmailSnapshot.val(); // Agora é seguro adicionar
        }

        // Verifica se o produto já existe
        const productSnapshot = await get(productRef);
        if (productSnapshot.exists()) {
            alert(`O código "${data.code}" já existe. Escolha outro.`);
            return;
        }

        // Salva os dados do produto no Firebase
        await set(productRef, AdocaoData);

        // Faz o upload da imagem para o S3
        // await s3.upload({
        //     Bucket: 'aumeow-images',
        //     Key: `${data.code}/imagemProduto`,
        //     Body: file,
        //     ContentType: file.type,
        // }).promise();

        alert('Produto criado com sucesso e salvo no banco!');
        console.log('Arquivo enviado com sucesso');

        // Navega para a tela do menu do prestador
        navigate('/MenuPrestador');
        } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
        alert('Erro ao adicionar o produto. Tente novamente.');
        } finally {
        setUploading(false);
        }
    };

    return(
        <div className="ContainerCadastroDeAdocao">
            <Header/>
            <div className='InnercontainerCadastroDeAdocao'>
                <h1 className='TitleCadastroDeAdocao'>Cadastro de Produtos</h1>
                <form className='FormContainerCadastroDeAdocao' onSubmit={handleSubmit(onSubmit)}>
                    {imagePreview && (
                        <div  style={{ display:'flex', flexDirection:'column', width: '100%', height: 'auto', alignItems:'center'}}>
                            <h3 className='txtCadastroDeAdocao'>Prévia da Imagem:</h3>
                            <img
                                src={imagePreview}
                                alt="Prévia da imagem selecionada"
                                style={{ width: '40%', height: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )}
                    <label className='txtCadastroDeAdocao'>Selecione uma imagem:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleClick}
                        className="botaoUploadImagemCadastroDeAdocao"
                    >Selecionar imagem</button>
                    <label className='txtCadastroDeAdocao'>Nome do produto:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Nome:'
                        {...register("name", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Código do produto:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Código:'
                        {...register("code", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Quantidade em estoque:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Quantidade:'
                        {...register("amount", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Preço do produto:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Preço:'
                        {...register("price", { required: true })}
                    />
                    <label className='txtCadastroDeAdocao'>Marca do produto:</label>
                    <input
                        className='InputTextCadastroDeAdocao'
                        type='text'
                        placeholder='Marca:'
                        {...register("brand", { required: true })}
                    />
                    <input
                        className='SubmitCadastroDeAdocao'
                        value={uploading ? 'Enviando...' : 'Enviar'}
                        type="submit"
                        disabled={uploading}
                    />
                </form>
            </div>
            <Footer/>
        </div>
    )
}