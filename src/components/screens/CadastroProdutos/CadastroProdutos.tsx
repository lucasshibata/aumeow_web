import { useState, useEffect, useRef } from 'react';
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { database, ref, set, get, auth } from '../../firebase/Firebase';
import s3 from '../../aws/aws-config';
import "./CadastroProdutos.css";
import verifyFunction from "../../layout/verifyFunction";
import withAuth from '../../contexts/LoginContext';

// Defina a interface para productData
interface ProductData {
    nome: string;
    codigo: string;
    quantidade: number;
    preco: number;
    marca: string;
    prestadorName: string;
    prestadorUID: string;
    prestadorEmail?: string; 
}

function CadastroProdutos() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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

     useEffect(()=>{
        const verificar = async () => {
            const funcao = await verifyFunction();
            
            switch (funcao){
                case "prestador":
                    navigate("/MenuPrestador");
                    break;
                case "cliente":
                    navigate("/MenuCliente");
                    break;
                default:
                    console.log("permitido ou não encontrado");
            }
            setLoading(false);
        }
        verificar();
    },[navigate])

    if(loading){
        <div>loading...</div>
    }

    const onSubmit = async (data: any) => {
        if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
        }

        setUploading(true);

        const user = auth.currentUser;
        const productRef = ref(database, 'products/' + data.code);
        const dbUserNameRef = ref(database, 'users/' + user?.uid + '/nome');
        const dbUserEmailRef = ref(database, 'users/' + user?.uid + '/email');

        // Declare productData com a interface ProductData
        let productData: ProductData = {
        nome: data.name,
        codigo: data.code,
        quantidade: data.amount,
        preco: data.price.replace(',', '.'),
        marca: data.brand,
        prestadorName: '',
        prestadorUID: user?.uid || '',
        };

        try {
        // Obtém o nome do usuário
        const userNameSnapshot = await get(dbUserNameRef);
        if (userNameSnapshot.exists()) {
            productData.prestadorName = userNameSnapshot.val();
        }

        // Obtém o email do usuário
        const userEmailSnapshot = await get(dbUserEmailRef);
        if (userEmailSnapshot.exists()) {
            productData.prestadorEmail = userEmailSnapshot.val(); // Agora é seguro adicionar
        }

        // Verifica se o produto já existe
        const productSnapshot = await get(productRef);
        if (productSnapshot.exists()) {
            alert(`O código "${data.code}" já existe. Escolha outro.`);
            return;
        }

        // Salva os dados do produto no Firebase
        await set(productRef, productData);

        // Faz o upload da imagem para o S3
        await s3.upload({
            Bucket: 'aumeow-images',
            Key: `${data.code}/imagemProduto`,
            Body: file,
            ContentType: file.type,
        }).promise();

        alert('Produto criado com sucesso e salvo no banco!');
        console.log('Arquivo enviado com sucesso');

        // Navega para a tela do menu do prestador
        navigate('/MenuAdministracao');
        } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
        alert('Erro ao adicionar o produto. Tente novamente.');
        } finally {
        setUploading(false);
        }
    };

    return (
        <div className='CadastroProdutos'>
            <Header />
            <div className='ContainerCadastroProdutos'>
                <h1 className='TitleCadastroProdutos'>Cadastro de Produtos</h1>
                <form className='FormContainerCadastroProdutos' onSubmit={handleSubmit(onSubmit)}>
                    {imagePreview && (
                        <div  style={{ display:'flex', flexDirection:'column', width: '100%', height: 'auto', alignItems:'center'}}>
                            <h3 className='txtCadastroProdutos'>Prévia da Imagem:</h3>
                            <img
                                src={imagePreview}
                                alt="Prévia da imagem selecionada"
                                style={{ width: '40%', height: '100%', marginTop: '10px' }}
                            />
                        </div>
                    )}
                    <label className='txtCadastroProdutos'>Selecione uma imagem:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleClick}
                        type='button'
                        className="botaoUploadImagemCadastroProdutos"
                    >Selecionar imagem</button>
                    <label className='txtCadastroProdutos'>Nome do produto:</label>
                    <input
                        className='InputTextCadastroProdutos'
                        type='text'
                        placeholder='Nome:'
                        {...register("name", { required: true })}
                    />
                    <label className='txtCadastroProdutos'>Código do produto:</label>
                    <input
                        className='InputTextCadastroProdutos'
                        type='text'
                        placeholder='Código:'
                        {...register("code", { required: true })}
                    />
                    <label className='txtCadastroProdutos'>Quantidade em estoque:</label>
                    <input
                        className='InputTextCadastroProdutos'
                        type='text'
                        placeholder='Quantidade:'
                        {...register("amount", { required: true })}
                    />
                    <label className='txtCadastroProdutos'>Preço do produto:</label>
                    <input
                        className='InputTextCadastroProdutos'
                        type='text'
                        placeholder='Preço:'
                        {...register("price", { required: true })}
                    />
                    <label className='txtCadastroProdutos'>Marca do produto:</label>
                    <input
                        className='InputTextCadastroProdutos'
                        type='text'
                        placeholder='Marca:'
                        {...register("brand", { required: true })}
                    />
                    <input
                        className='SubmitCadastroProdutos'
                        value={uploading ? 'Enviando...' : 'Enviar'}
                        type="submit"
                        disabled={uploading}
                    />
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default withAuth(CadastroProdutos);