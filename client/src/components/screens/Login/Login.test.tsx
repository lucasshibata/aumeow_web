import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../contexts/LoginContext', () => ({
  __esModule: true,
  default: (Component: React.ComponentType) => Component,
}));

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Login', () => {
  test('deve renderizar o título "Entrar"', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('heading', { name: /entrar/i })).toBeInTheDocument();
  });

  test('deve conter os campos de email e senha', () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test('deve conter botão de envio com texto "Enviar"', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  test('deve conter link para cadastro', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/não possuo cadastro/i)).toBeInTheDocument();
  });

  test('deve conter botão "Voltar"', async () => {
    renderWithRouter(<Login />);
    const voltarBtn = screen.getByRole('button', { name: /voltar/i });
    expect(voltarBtn).toBeInTheDocument();
    await userEvent.click(voltarBtn); // Simula clique, mas sem mock de navegação por enquanto
  });
});
