import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CadastroPrestador from './CadastroPrestador';
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

describe('CadastroPrestador', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
  });

  it('renderiza todos os campos do formulário', () => {
    renderWithRouter(<CadastroPrestador />);

    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Endereço:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone de Contato:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experiência:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Raio de Atendimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Animal de Preferência:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Foto Pessoal:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sexo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insira a senha:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Repita a senha:/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar/i)).toBeInTheDocument();
  });

  it('navega para a página anterior ao clicar no botão Voltar', () => {
    renderWithRouter(<CadastroPrestador />);
    fireEvent.click(screen.getByText(/Voltar/i));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('envia o formulário com os dados preenchidos', async () => {
    const mockSignUp = SignUpModule.default as jest.Mock;
    renderWithRouter(<CadastroPrestador />);

    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Maria' } });
    fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: '98765432100' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'maria@email.com' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento:/i), { target: { value: '1995-05-15' } });
    fireEvent.change(screen.getByLabelText(/Endereço:/i), { target: { value: 'Rua 2' } });
    fireEvent.change(screen.getByLabelText(/Telefone de Contato:/i), { target: { value: '888888888' } });
    fireEvent.change(screen.getByLabelText(/Experiência:/i), { target: { value: '5 anos com pets' } });
    fireEvent.change(screen.getByLabelText(/Raio de Atendimento/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Animal de Preferência:/i), { target: { value: 'gato' } });
    fireEvent.change(screen.getByLabelText(/sexo:/i), { target: { value: 'Feminino' } });
    fireEvent.change(screen.getByLabelText(/Insira a senha:/i), { target: { value: 'senha123' } });
    fireEvent.change(screen.getByLabelText(/Repita a senha:/i), { target: { value: 'senha123' } });

    fireEvent.click(screen.getByText(/Enviar/i));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Maria',
          cpf: '98765432100',
          email: 'maria@email.com',
          dtNascimento: '1995-05-15',
          endereco: 'Rua 2',
          telefone: '888888888',
          experiencia: '5 anos com pets',
          raioAtendimento: '10',
          animalPreferencia: 'gato',
          gender: 'Feminino',
          password: 'senha123',
          passwordAgain: 'senha123',
        }),
        mockNavigate,
        'prestador',
        null
      );
    });
  });

  it('atualiza a prévia da imagem ao selecionar um arquivo', async () => {
    renderWithRouter(<CadastroPrestador />);

    const file = new File(['dummy content'], 'photo.png', { type: 'image/png' });
    const inputFile = screen.getByLabelText(/Foto Pessoal:/i);

    fireEvent.change(inputFile, { target: { files: [file] } });

    await waitFor(() => {
      const imgPreview = screen.getByAltText(/Prévia da imagem selecionada/i);
      expect(imgPreview).toBeInTheDocument();
    });
  });

  it('renderiza botão para selecionar imagem', () => {
    renderWithRouter(<CadastroPrestador />);
    const elementos = screen.getAllByLabelText(/Selecionar imagem/i);
    expect(elementos.length).toBeGreaterThan(0);
  });
});
