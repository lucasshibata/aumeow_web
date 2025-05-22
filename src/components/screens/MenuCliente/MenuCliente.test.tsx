import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MenuCliente from './MenuCliente';

// Mock dos componentes externos
jest.mock('../../layout/Header', () => () => <div data-testid="header" />);
jest.mock('../../layout/Footer', () => () => <div data-testid="footer" />);
jest.mock('../../layout/NavToolsImg', () => ({ src, titleNav, onTouch }: any) => (
  <div onClick={onTouch} role="button">
    <img src={src} alt={titleNav} />
    <span>{titleNav}</span>
  </div>
));

// Mock do HOC withAuth (ele apenas retorna o componente original)
jest.mock('../../contexts/LoginContext', () => ({
  __esModule: true,
  default: (Component: any) => Component,
}));

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MenuCliente', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renderiza todos os itens do menu', () => {
    render(
      <MemoryRouter>
        <MenuCliente />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    expect(screen.getByText(/Serviços Pet/i)).toBeInTheDocument();
    expect(screen.getByText(/Loja/i)).toBeInTheDocument();
    expect(screen.getByText(/Denuncia/i)).toBeInTheDocument();
    expect(screen.getByText(/Adoção/i)).toBeInTheDocument();
  });

  it('navega para a página correta ao clicar em um item', async () => {
    render(
      <MemoryRouter>
        <MenuCliente />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.click(screen.getByText(/Serviços Pet/i));
    expect(mockNavigate).toHaveBeenCalledWith('/PetServices');

    await user.click(screen.getByText(/Loja/i));
    expect(mockNavigate).toHaveBeenCalledWith('/Shopping');

    await user.click(screen.getByText(/Denuncia/i));
    expect(mockNavigate).toHaveBeenCalledWith('/Denuncia');

    await user.click(screen.getByText(/Adoção/i));
    expect(mockNavigate).toHaveBeenCalledWith('/PaginaDeAdocao');
  });
});
