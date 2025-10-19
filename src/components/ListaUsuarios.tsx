import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Usuario } from '../types/Usuario';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// **ATENÇÃO:** Verifique a porta da sua API (.NET) no terminal onde ela está rodando.
const API_URL = `${API_BASE_URL}/Usuario`; 

interface ListaUsuariosProps {
    reloadFlag?: number; // Flag para recarregar a lista
};

const ListaUsuarios = ({ reloadFlag }: ListaUsuariosProps) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use useCallback para garantir que a função fetchUsuarios seja estável
  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Usuario[]>(API_URL);
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios, reloadFlag]);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>-</th>
              <th>CPF</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>-</td>
                <td>{usuario.cpf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaUsuarios;