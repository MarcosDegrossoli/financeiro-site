// src/components/FormularioCadastroUsuario.tsx
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// **ATENÇÃO:** Verifique a porta da sua API (.NET)
const API_URL = `${API_BASE_URL}/Usuario`; 

interface FormularioProps {
  onUserAdded: () => void;
}

const FormularioCadastroUsuario = ({onUserAdded}: FormularioProps) => {
  // Estados para capturar os dados do formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  
  // Estado para feedback (sucesso/erro)
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página

    // 1. Limpa o feedback anterior
    setMensagem(null);

    // 2. Cria o objeto de dados que será enviado para a API
    const novoUsuario = {
      nome: nome,
      cpf: cpf,
      // Se sua API espera um ID, gere um aqui ou deixe o backend lidar com isso.
      // Assumimos que o backend gera o GUID (IdUsuario).
    };

    try {
      // 3. Envia a requisição POST
      const resposta = await axios.post(API_URL, novoUsuario);
      
      // 4. Limpa o formulário e exibe sucesso
      setNome('');
      setCpf('');
      setIsSuccess(true);
      setMensagem(`Usuário cadastrado com sucesso!`);

      onUserAdded();

      // NOTA: Em um app real, você atualizaria a ListaUsuarios aqui.
      
    } catch (error) {
      setIsSuccess(false);
      
      // Tenta obter a mensagem de erro do backend (se for um 400 Bad Request/Conflict)
      let errorMessage = "Erro ao cadastrar usuário. Verifique o console.";
      if (axios.isAxiosError(error) && error.response) {
        // Exemplo: pega a mensagem de conflito (409) ou bad request (400)
        errorMessage = error.response.data.message || errorMessage;
      }
      setMensagem(errorMessage);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '20px 0' }}>
      <h2>Cadastrar Novo Usuário</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>

      {/* Exibição do feedback */}
      {mensagem && (
        <p style={{ marginTop: '10px', color: isSuccess ? 'green' : 'red' }}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default FormularioCadastroUsuario;