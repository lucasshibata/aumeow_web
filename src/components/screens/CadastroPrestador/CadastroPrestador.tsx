import { useState, useRef } from 'react';
import BackGround from '../../layout/BackGround';
import { useForm } from 'react-hook-form';
import './CadastroPrestador.css';
import SignUp from '../../layout/SignUp';
import { useNavigate } from 'react-router-dom';
import TitleLogo from '../../layout/TitleLogo';
import { FaArrowLeft } from 'react-icons/fa';

function CadastroPrestador() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imageUrl);
    }
  };

  return (
    <div className='CadastroPrestador'>
      <BackGround>
        <div className='ContainerCadastroPrestador'>
          <button className='BotaoVoltarCadastroPrestador' onClick={() => navigate(-1)}>
            <FaArrowLeft /> Voltar
          </button>
          <TitleLogo />
          <div className='InnerContainerCadastroPrestador'>
            <h1 className='TitleCadastroPrestador'>Cadastro Prestador</h1>
            <form
              className='FormContainerCadastroPrestador'
              onSubmit={handleSubmit((data) => SignUp(data, navigate, 'prestador', file))}
            >
              <label htmlFor="nomeCadastroPrestador" className='txtCadastroPrestador'>Nome:</label>
              <input id="nomeCadastroPrestador" className='InputTextCadastroPrestador' type='text' placeholder='Nome Completo:' {...register("name")} />

              <label htmlFor="CPFCadastroPrestador" className='txtCadastroPrestador'>CPF:</label>
              <input id="CPFCadastroPrestador" className='InputTextCadastroPrestador' type='text' placeholder='CPF:' {...register("cpf")} />

              <label htmlFor="emailCadastroPrestador" className='txtCadastroPrestador'>Email:</label>
              <input id="emailCadastroPrestador" className='InputTextCadastroPrestador' type='email' placeholder='Email:' {...register("email")} />

              <label htmlFor="dataNascimentoCadastroPrestador" className='txtCadastroPrestador'>Data de Nascimento:</label>
              <input id="dataNascimentoCadastroPrestador" className='InputTextCadastroPrestador' type='date' placeholder='Data:' {...register("dtNascimento")} />

              <label htmlFor="enderecoCadastroPrestador" className='txtCadastroPrestador'>Endereço:</label>
              <input id="enderecoCadastroPrestador" className='InputTextCadastroPrestador' type='text' placeholder='Endereço:' {...register("endereco")} />

              <label htmlFor="telefoneCadastroPrestador" className='txtCadastroPrestador'>Telefone de Contato:</label>
              <input id="telefoneCadastroPrestador" className='InputTextCadastroPrestador' type='text' placeholder='Telefone:' {...register("telefone")} />

              <label htmlFor="experienciaCadastroPrestador" className='txtCadastroPrestador'>Experiência:</label>
              <input id="experienciaCadastroPrestador" className='InputTextCadastroPrestador' type='text' placeholder='Diga sua experiência:' {...register("experiencia")} />

              <label htmlFor="raioCadastroPrestador" className='txtCadastroPrestador'>Raio de Atendimento (Km):</label>
              <input id="raioCadastroPrestador" className='InputTextCadastroPrestador' type='number' placeholder='Raio:' {...register("raioAtendimento")} />

              <label htmlFor="animalPreferenciaCadastroPrestador" className='txtCadastroPrestador'>Animal de Preferência:</label>
              <select id="animalPreferenciaCadastroPrestador" className='InputTextCadastroPrestador' {...register("animalPreferencia")}>
                <option value="gato">Gato</option>
                <option value="cachorro">Cachorro</option>
              </select>

              <label htmlFor="arquivoImagemCadastroPrestador" className='txtCadastroPrestador'>Foto Pessoal:</label>

              {imagePreview && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '30vw', height: 'auto', alignItems: 'center' }}>
                  <h3 className='txtCadastroDono'>Prévia da Imagem:</h3>
                  <img
                    src={imagePreview}
                    alt="Prévia da imagem selecionada"
                    style={{ width: '30%', height: 'auto', marginTop: '10px' }}
                  />
                </div>
              )}

              <input
                id="arquivoImagemCadastroPrestador"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />

              <label
                htmlFor="arquivoImagemCadastroPrestador"
                className="botaoUploadImagemCadastroPrestador"
                role="button"
                aria-label="Selecionar imagem"
              >
                Selecionar imagem
              </label>

              <label htmlFor="sexoCadastroPrestador" className='txtCadastroPrestador'>sexo:</label>
              <select id="sexoCadastroPrestador" className='InputTextCadastroPrestador' {...register("gender")}>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
              </select>

              <label htmlFor="senhaCadastroPrestador" className='txtCadastroPrestador'>Insira a senha:</label>
              <input id="senhaCadastroPrestador" className='InputTextCadastroPrestador' type='password' placeholder='Insira a senha:' {...register("password")} />

              <label htmlFor="senhaDeNovoCadastroPrestador" className='txtCadastroPrestador'>Repita a senha:</label>
              <input id="senhaDeNovoCadastroPrestador" className='InputTextCadastroPrestador' type='password' placeholder='Repita a senha:' {...register("passwordAgain")} />

              <input className='submitCadastroPrestador' value='Enviar' type="submit" />
            </form>
          </div>
        </div>
      </BackGround>
    </div>
  );
}

export default CadastroPrestador;
