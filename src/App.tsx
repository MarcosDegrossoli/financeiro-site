// src/App.tsx
import { useState } from 'react'; // Importe useState
import ListaUsuarios from './components/ListaUsuarios';
import FormularioCadastroUsuario from './components/FormularioCadastroUsuario';
import './App.css';

function App() {
  // 1. Crie um estado para forçar a recarga
  const [reloadKey, setReloadKey] = useState(0); 
  
  // 2. Crie a função que será passada para o formulário
  const handleUserAdded = () => {
    // Incrementa a chave para forçar a ListaUsuarios a recarregar
    setReloadKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      {/* 3. Passe a função de callback para o FormularioCadastroUsuario */}
      <FormularioCadastroUsuario onUserAdded={handleUserAdded} /> 
      
      <hr style={{ margin: '30px 0' }} />
      
      {/* 4. Passe a chave de recarga para a ListaUsuarios */}
      <ListaUsuarios reloadFlag = {reloadKey} /> 
    </div>
  );
}

export default App;