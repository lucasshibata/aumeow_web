import { useState } from 'react';
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { database, ref, set, get, auth } from '../firebase/Firebase';
import s3 from '../aws/aws-config';
import "./CadastroProdutos.css";

// Defina a interface para productData
interface ProductData {
  nome: string;
  codigo: string;
  quantidade: number;
  preco: number;
  marca: string;
  prestadorName: string;
  prestadorUID: string;
  prestadorEmail?: string; // A propriedade é opcional
}

export default function CadastroProdutos() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
      preco: data.price,
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
        Key: `uploads/${file.name}`,
        Body: file,
        ContentType: file.type,
      }).promise();

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

  return (
    <div className='CadastroProdutos'>
      <Header />
      <div className='Container'>
        <h1 className='Title'>Cadastro de Produtos</h1>
        <form className='FormContainer' onSubmit={handleSubmit(onSubmit)}>
          <label>Selecione uma imagem:</label>
          <input
            className='file'
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <label className='txt'>Nome do produto:</label>
          <input
            className='InputText'
            type='text'
            placeholder='Nome:'
            {...register("name", { required: true })}
          />
          <label className='txt'>Código do produto:</label>
          <input
            className='InputText'
            type='text'
            placeholder='Código:'
            {...register("code", { required: true })}
          />
          <label className='txt'>Quantidade em estoque:</label>
          <input
            className='InputText'
            type='text'
            placeholder='Quantidade:'
            {...register("amount", { required: true })}
          />
          <label className='txt'>Preço do produto:</label>
          <input
            className='InputText'
            type='text'
            placeholder='Preço:'
            {...register("price", { required: true })}
          />
          <label className='txt'>Marca do produto:</label>
          <input
            className='InputText'
            type='text'
            placeholder='Marca:'
            {...register("brand", { required: true })}
          />
          <input
            className='Submit'
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