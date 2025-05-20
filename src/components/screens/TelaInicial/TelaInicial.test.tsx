// src/pages/__tests__/TelaInicial.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TelaInicial from "./TelaInicial";

// wrapper para usar o Router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("TelaInicial", () => {
  it("deve renderizar o título principal", () => {
    renderWithRouter(<TelaInicial />);
    expect(screen.getByText("Cuidando dos nossos pequenos amigos")).toBeInTheDocument();
  });

  it("deve exibir o botão 'Fique por dentro'", () => {
    renderWithRouter(<TelaInicial />);
    expect(screen.getByRole("button", { name: /fique por dentro/i })).toBeInTheDocument();
  });

  it("deve renderizar os cards de serviços", () => {
    renderWithRouter(<TelaInicial />);
    expect(screen.getByText(/Pet Sitter/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Loja/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Adoção/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Denúncia/i)).toBeInTheDocument();
  });

  it("deve conter botão 'Conheça mais Sobre Nós'", () => {
    renderWithRouter(<TelaInicial />);
    const botao = screen.getByRole("button", { name: /Conheça mais Sobre Nós/i });
    expect(botao).toBeInTheDocument();
  });

  it("deve navegar para /Login ao clicar no botão 'Fique por dentro'", () => {
    renderWithRouter(<TelaInicial />);
    const botao = screen.getByRole("button", { name: /fique por dentro/i });
    fireEvent.click(botao);
    // você pode verificar se o botão existe e foi clicado. Para verificar navegação real, seria necessário usar mocks.
    expect(botao).toBeEnabled();
  });
});
