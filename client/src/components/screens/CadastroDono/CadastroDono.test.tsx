import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CadastroDono from './CadastroDono';
import { BrowserRouter } from 'react-router-dom';
import * as SignUpModule from '../../layout/SignUp';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../layout/SignUp', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CadastroDono', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  it('renderiza todos os campos do formulário', () => {
    renderWithRouter(<CadastroDono />);

    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Endereço:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone de Contato:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome do Pet:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Espécie do Pet:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo do Animal:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Foto Pessoal:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insira a senha:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repita a senha:/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar/i)).toBeInTheDocument();
  });

  it('navega para a página anterior ao clicar no botão Voltar', () => {
    renderWithRouter(<CadastroDono />);
    fireEvent.click(screen.getByText(/Voltar/i));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('envia o formulário com os dados preenchidos', async () => {
    const mockSignUp = SignUpModule.default as jest.Mock;
    renderWithRouter(<CadastroDono />);

    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'João' } });
    fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: '12345678900' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'joao@email.com' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento:/i), { target: { value: '2000-01-01' } });
    fireEvent.change(screen.getByLabelText(/Endereço:/i), { target: { value: 'Rua 1' } });
    fireEvent.change(screen.getByLabelText(/Telefone de Contato:/i), { target: { value: '999999999' } });
    fireEvent.change(screen.getByLabelText(/Nome do Pet:/i), { target: { value: 'Rex' } });
    fireEvent.change(screen.getByLabelText(/Espécie do Pet:/i), { target: { value: 'Canino' } });
    fireEvent.change(screen.getByLabelText(/Tipo do Animal:/i), { target: { value: 'cachorro' } });
    fireEvent.change(screen.getByLabelText(/sexo:/i), { target: { value: 'Masculino' } });
    fireEvent.change(screen.getByLabelText(/Insira a senha:/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Repita a senha:/i), { target: { value: '123456' } });

    fireEvent.click(screen.getByText(/Enviar/i));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'João',
          cpf: '12345678900',
          email: 'joao@email.com',
          dtNascimento: '2000-01-01',
          endereco: 'Rua 1',
          telefone: '999999999',
          nomeDoPet: 'Rex',
          especie: 'Canino',
          tipoAnimal: 'cachorro',
          gender: 'Masculino',
          password: '123456',
          passwordAgain: '123456',
        }),
        mockNavigate,
        'cliente',
        null
      );
    });
  });

  it('atualiza a prévia da imagem ao selecionar um arquivo', async () => {
    renderWithRouter(<CadastroDono />);

    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' });
    const inputFile = screen.getByLabelText(/Foto Pessoal:/i);

    fireEvent.change(inputFile, { target: { files: [file] } });

    await waitFor(() => {
      const imgPreview = screen.getByAltText(/Prévia da imagem selecionada/i);
      expect(imgPreview).toBeInTheDocument();
    });
  });

  it('renderiza botão para selecionar imagem', () => {
    renderWithRouter(<CadastroDono />);
    expect(screen.getByText(/Selecionar imagem/i)).toBeInTheDocument();
  });
});
