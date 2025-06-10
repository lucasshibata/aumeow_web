import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CadastroDeAdocao from "./CadastroDeAdocao";
import { BrowserRouter } from "react-router-dom";

// Mock das dependências externas
jest.mock("../../firebase/Firebase", () => ({
  auth: { currentUser: { uid: "123" } },
  ref: jest.fn(),
  push: jest.fn(() => ({ key: "fakeKey" })),
  database: {},
  get: jest.fn(() => Promise.resolve({ exists: () => false })),
  set: jest.fn(() => Promise.resolve())
}));

jest.mock("../../aws/aws-config", () => ({
  uploadFile: jest.fn(() => Promise.resolve())
}));

jest.mock("../../layout/verifyFunction", () => jest.fn(() => Promise.resolve("cliente")));

// Componente com router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Tela CadastroDeAdocao", () => {
  test("renderiza o formulário de cadastro", () => {
    renderWithRouter(<CadastroDeAdocao />);
    expect(screen.getByText("Cadastro de Adoção")).toBeInTheDocument();
    expect(screen.getByText("Nome do Animal:")).toBeInTheDocument();
    expect(screen.getByText("Especie do Animal:")).toBeInTheDocument();
    expect(screen.getByText("Sexo:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Selecionar imagem/i })).toBeInTheDocument();
  });

  test("preenche e envia o formulário com dados simulados", async () => {
    renderWithRouter(<CadastroDeAdocao />);

    fireEvent.change(screen.getByPlaceholderText("Nome:"), { target: { value: "Rex" } });
    fireEvent.change(screen.getByPlaceholderText("Raça:"), { target: { value: "Vira-lata" } });
    fireEvent.change(screen.getByPlaceholderText("Idade:"), { target: { value: "3" } });
    fireEvent.change(screen.getByPlaceholderText("Historia:"), { target: { value: "Resgatado da rua" } });
    fireEvent.change(screen.getByPlaceholderText("Responsável:"), { target: { value: "João" } });
    fireEvent.change(screen.getByPlaceholderText("Email do Responsável:"), { target: { value: "joao@email.com" } });

    fireEvent.change(screen.getByLabelText("Especie do Animal:"), { target: { value: "Gato" } });
    fireEvent.change(screen.getByLabelText("Sexo:"), { target: { value: "Macho" } });
    fireEvent.change(screen.getByLabelText("Porte do Animal:"), { target: { value: "Médio" } });

    const submitButton = screen.getByRole("button", { name: /Enviar/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue(/Enviando...|Enviar/i)).toBeInTheDocument();
    });
  });
});
