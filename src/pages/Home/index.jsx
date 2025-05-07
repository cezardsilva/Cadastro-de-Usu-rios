import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trashr.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()
  const inputTelefone = useRef()

  async function getUsers() {
    try {
      const response = await api.get('api.php')
      setUsers(response.data) // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  //POST

  async function createUsers() {
    await api.post('api.php', {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value,
      telefone: inputTelefone.current.value,
    })

    // Limpa os campos do formulário após o cadastro
    inputNome.current.value = "";
    inputIdade.current.value = "";
    inputEmail.current.value = "";
    inputTelefone.current.value = "";

    getUsers()
  }

  async function deleteUser(id) {
    try {
      const response = await api.delete(`api.php/${id}`); // ✅ Correto!
      console.log("Usuário deletado com sucesso:", response.data);
      getUsers(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" placeholder="nome" type="text" ref={inputNome} />
        <input name="idade" placeholder="idade" type="number" ref={inputIdade} />
        <input name="email" placeholder="email@email.com" type="email" ref={inputEmail} />
        <input name="telefone" placeholder="(xx)xxxxx-xxxx" type="text" ref={inputTelefone} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Idade: <span>{user.idade}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Telefone: <span>{user.telefone}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} width="16" height="16" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
