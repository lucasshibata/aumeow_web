import { render, screen, fireEvent } from "@testing-library/react";
import SobreNos from "./SobreNos";
import { MemoryRouter } from "react-router-dom";
import { mandarParaInstagram } from './mandarParaInstagram';

// Mocks dos componentes de layout
jest.mock("../../layout/Header", () => () => <div data-testid="header" />);
jest.mock("../../layout/Footer", () => () => <div data-testid="footer" />);
jest.mock('./mandarParaInstagram', () => ({
  mandarParaInstagram: jest.fn(),
}));

// Mock da navegação
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Tela SobreNos", () => {
  beforeEach(() => {
    // Limpa navegações anteriores
    mockNavigate.mockClear();
    window.location.href = ""; // apenas redefine
  });

  it("deve renderizar todos os elementos principais", () => {
    render(
      <MemoryRouter>
        <SobreNos />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByText(/Quem está por trás do AuMeow/i)).toBeInTheDocument();
    expect(screen.getByText(/Somos um grupo de desenvolvedores/i)).toBeInTheDocument();
    expect(screen.getByText(/Nossa equipe preza pelo bem dos animais/i)).toBeInTheDocument();
    expect(screen.getByText(/Venha conhecer nossas redes sociais/i)).toBeInTheDocument();
  });

  it("deve navegar para a página anterior ao clicar no botão Voltar", () => {
    render(
      <MemoryRouter>
        <SobreNos />
      </MemoryRouter>
    );

    const botaoVoltar = screen.getByRole("button", { name: /voltar/i });
    fireEvent.click(botaoVoltar);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("deve redirecionar para o Instagram ao clicar", () => {
    render(<SobreNos />);
    const botaoInstagram = screen.getByText("Venha conhecer nossas redes sociais");

    fireEvent.click(botaoInstagram);

    expect(mandarParaInstagram).toHaveBeenCalled();
    });
});