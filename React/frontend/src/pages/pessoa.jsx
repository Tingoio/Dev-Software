import axios from "axios";
import { useState, useEffect } from "react";

function Pessoas() {
  const [pessoa, setPessoa] = useState(null);
  const [pessoas, setPessoas] = useState([]);

  function listarPessoas() {
    axios.get("http://localhost:5238/pessoas").then((resposta) => {
      setPessoas(resposta.data);
    });
  }

  useEffect(() => {
    listarPessoas();
  }, []);

  function excluir(id) {
    axios.delete("http://localhost:5283/pessoas/" + id).then(() => {
      listarPessoas();
    });
  }

  function Linha(index, pessoa) {
    return (
      <tr key={index}>
        <td>{pessoa.id}</td>
        <td>{pessoa.nome}</td>
        <td>{pessoa.idade}</td>
        <td>
          <button
            onClick={() => {
              excluir(pessoa.id);
            }}
          >
            Excluir
          </button>
          <button
            onClick={() => {
              editar(pessoa);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function Linhas(pessoas) {
    const linhas = [];
    for (let i = 0; i < pessoas.length; i++) {
      const pessoa = pessoas[i];
      linhas[i] = Linha(i, pessoa);
    }
    return linhas;
  }

  function cancelar() {
    setPessoa(null);
  }

  function aoAlterarPessoa(e) {
    const { name, value } = e.target;
    setPessoa({
      ...pessoa,
      [name]: value
    });
  }

  function editar(pessoa) {
    setPessoa({
      id : pessoa.id,
      nome : pessoa.nome,
      idade : pessoa.idade
    });
  }

  function salvar() {
    if (pessoa.id) {
      axios
        .put("http://localhost:5283/pessoas/" + pessoa.id, pessoa)
        .then(listarPessoas());
    } else {
      axios.post("http://localhost:5283/pessoas", pessoa).then(listarPessoas());
    }
  }

  function Formulario() {
    return (
      <form>
        <label for="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={pessoa.nome}
          onChange={aoAlterarPessoa}
        />
        <label htmlFor="idade">Idade</label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={pessoa.idade}
          onChange={aoAlterarPessoa}
        />
        <button onClick={salvar}>Salvar</button>
        <button onClick={cancelar}>Cancelar</button>
      </form>
    );
  }

  function novaPessoa() {
    setPessoa({
      nome: "",
      idade: ""
    });
  }

  function Tabela(pessoas) {
    return (
      <>
        <button onClick={() => {novaPessoa();}}>Nova pessoa</button>
        <table>
          {listarPessoas()}
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
          {Linhas(pessoas)}
        </table>
      </>
    );
  }

  function conteudoPrincipal() {
    if (pessoa == null) {
      return Tabela(pessoas);
    } else {
      return Formulario();
    }
  }

  return (
    <div>
      <h1>Cadastro de Pessoas</h1>
      {conteudoPrincipal()}
    </div>
  );
}

export default Pessoas;
