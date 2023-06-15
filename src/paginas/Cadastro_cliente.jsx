import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro_cliente() {
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);

  const [name, setName] = useState("");
  const [endereco, setEndereco] = useState("");
  const [data_nasc, setData_nasc] = useState("");
  const [contato, setContato] = useState("");
  const [cpf, setCpf] = useState("");

  function EnviandoBancoProd() {
    const formData = {
      nomeCliente: name,
      endereco: endereco,
      data_nasc: data_nasc,
      contato: contato,
      cpf: cpf
    };

    
    axios
      .post("http://localhost:3000/cliente", formData)
      .then(response => {
        alert("Dados enviados com sucesso");
        setName("");
        setEndereco("");
        setData_nasc("");
        setContato("");
        setCpf("");
        getClientes(); // Atualiza a lista de clientes após o salvamento bem-sucedido
      })
      .catch(error => {
        console.error("Erro ao enviar os dados:", error);
      });
      
    
  }

  function cancelar() {
    setCliente(null);
  }

  function editarCliente(cliente) {
    setCliente(cliente);
  }

  function getClientes() {
    console.log("Passou por aqui...");
    axios.get("http://localhost:3000/cliente").then(resposta => {
      setClientes(resposta.data);
      console.log(resposta.data);
    });
  }

  useEffect(getClientes, []);

  function excluirCliente(id) {
    axios.delete("http://localhost:3000/cliente/" + id).then(() => {
      console.log("bye bye");
      getClientes();
    });
  }

  function getLinha(cliente) {
    return (
      <tr key={cliente._id}>
        <td>{cliente._id}</td>
        <td>{cliente.nomeCliente}</td>
        <td>{cliente.endereco}</td>
        <td>{cliente.data_nasc}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.contato}</td>
        <td>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do cliente " + cliente.nomeCliente + "?"
                )
              ) {
                excluirCliente(cliente._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            onClick={() => {
              editarCliente(cliente);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    return clientes.map(cliente => getLinha(cliente));
  }

  function getTabela() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Data Nasc</th>
            <th>CPF</th>
            <th>Contato</th>
          </tr>
        </thead>
        <tbody>{getLinhas()}</tbody>
      </table>
    );
  }

  function getFormulario() {
    return (
      <form>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label>Endereço</label>
        <input
          type="text"
          name="endereco"
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
        />
        <label>Data de Nascimento</label>
        <input
          type="text"
          name="data_nasc"
          value={data_nasc}
          onChange={e => setData_nasc(e.target.value)}
        />
        <label>CPF</label>
        <input
          type="number"
          name="cpf"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
        />
        <label>Contato</label>
        <input
          type="number"
          name="contato"
          value={contato}
          onChange={e => setContato(e.target.value)}
        />
        
          <button type="button" onClick={EnviandoBancoProd}>
            Salvar
          </button>
        
        <button type="button" onClick={cancelar}>
          Voltar
        </button>
      </form>
    );
  }

  function getConteudo() {
    if (cliente) {
      return getFormulario();
    } else {
      return (
        <>
          <button onClick={() => setCliente(true)}>Adicionar Cliente</button>
          {getTabela()}
        </>
      );
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">
        <h2>Cadastro de Clientes</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Cadastro_cliente;