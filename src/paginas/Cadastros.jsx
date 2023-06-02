import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Cadastros() {

  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState([]);

  function novoCliente(){
    setCliente({
        descricao: ""
      });
  }

  function cancelar(){
    setCliente(null);
  }

  function editarCliente(cliente){
    setCliente(cliente);
  }

  function salvarCliente(){
    if(cliente._id){
      axios.put("http://localhost:3001/cliente/cadastro" + cliente._id, cliente).then((res)=> {
        refresh();
      });
    } else {
      axios.post("http://localhost:3001/cliente/cadastro", cliente).then((res)=> {
        refresh();
      });
    }
  }

  function refresh(){
    cancelar();
    getClientes();
  }

  function onChangeCliente(event, id){
    setArea({
      _id : id,
      descricao: event.target.value
    });
  }

  function getClientes() {
    console.log("Passou por aqui...");
    axios.get("http://localhost:3001/cliente/listar").then((resposta) => {
      console.log(resposta.data);
      setClientes(resposta.data);
    });
  }

  useEffect(getClientes, []);

  function excluirCliente(id) {
    axios.delete("http://localhost:3001/cliente/listar" + id).then(() => {
      console.log("bye bye");
      getClientes();
    });
  }

  function getLinha(cliente){
    return (
      <tr>
        <td>{cliente._id}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.endereco}</td>
        <td>{cliente.data_nasc}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.contato}</td>
        <td>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da área " + cliente.nome + "?"
                )
              ) {
                excluirCliente(cliente._id);
              }
            }}
          >
            Excluir
          </button>
          <button onClick={()=>{
            editarCliente(cliente);
          }} >Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhas = [];
    for(let i = 0; i < clientes.length; i++){
      const cliente = cliente[i];
      linhas[i] = getLinha(cliente);
    }
    return linhas;
    //return areas.map((area) => getLinha(area));
  }

  function getTabela() {
    return (
      <table>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>data Nasc</th>
          <th>CPF</th>
          <th>Contato</th>
        </tr>
        {getLinhas()}
      </table>
    );
  }

  function getFormulario(){
    return (
        <form>
          <label>Nome</label>
          <input type="text" value={cliente.nome}/>
          <label>Endereço</label>
          <input type="text" value={cliente.endereco}/>
          <label>Data de Nascimento</label>
          <input type="text" value={cliente.data_nasc}/>
          <label>CPF</label>
          <input type="text" value={cliente.cpf}/>
          <label>Contato</label>
          <input type="text" value={cliente.contato}/>
          
          

              onChange={(event)=>{
                onChangeCliente(event, cliente._id);
              }}
          
          <button onClick={salvarCliente}>Salvar</button>
          <button onClick={cancelar} >Cancelar</button>
        </form>
    );
  }

  function getConteudo(){
    if(cliente){
      return getFormulario();
    } else {
      return (
        <>
            <button onClick={novoCliente} >Adicionar Cliente</button>
            {getTabela()}
        </>
      );
    }
  }

  return (
    <div className="cadastros">
      <Aside />
      <div className="conteudo">
        <h2>Cadastro de Clientes</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Cadastros;
