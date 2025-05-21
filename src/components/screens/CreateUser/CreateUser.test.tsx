import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateUser from './CreateUser';
import { BrowserRouter } from 'react-router-dom';

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('CreateUser', () => {
  test('deve renderizar o título de boas-vindas', () => {
    renderWithRouter(<CreateUser />);
    expect(screen.getByRole('heading', { name: /bem-vindo ao aumeow!/i })).toBeInTheDocument();
  });

  test('deve exibir o texto de instrução', () => {
    renderWithRouter(<CreateUser />);
    expect(screen.getByText(/escolha uma opção para se cadastrar/i)).toBeInTheDocument();
  });

  test('deve conter botão "Dono de Pet"', () => {
    renderWithRouter(<CreateUser />);
    expect(screen.getByRole('button', { name: /dono de pet/i })).toBeInTheDocument();
  });

  test('deve conter botão "Prestador de Serviços"', () => {
    renderWithRouter(<CreateUser />);
    expect(screen.getByRole('button', { name: /prestador de serviços/i })).toBeInTheDocument();
  });

  test('deve conter botão "Voltar"', async () => {
    renderWithRouter(<CreateUser />);
    const voltarBtn = screen.getByRole('button', { name: /voltar/i });
    expect(voltarBtn).toBeInTheDocument();
    await userEvent.click(voltarBtn); // apenas simula clique, navegação não é verificada aqui
  });
});
