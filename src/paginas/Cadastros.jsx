import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Aside from "../layout/Aside";

function Cadastros() {

  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState([]);

  function novaArea(){
    setArea({
        descricao: ""
      });
  }

  function cancelar(){
    setArea(null);
  }

  function editarArea(area){
    setArea(area);
  }

  function salvarArea(){
    if(area._id){
      axios.put("http://localhost:3005/areas/" + area._id, area).then((res)=> {
        refresh();
      });
    } else {
      axios.post("http://localhost:3005/areas", area).then((res)=> {
        refresh();
      });
    }
  }

  function refresh(){
    cancelar();
    getAreas();
  }

  function onChangeArea(event, id){
    setArea({
      _id : id,
      descricao: event.target.value
    });
  }

  function getAreas() {
    console.log("Passou por aqui...");
    axios.get("http://localhost:3005/areas").then((resposta) => {
      console.log(resposta.data);
      setAreas(resposta.data);
    });
  }

  useEffect(getAreas, []);

  function excluirArea(id) {
    axios.delete("http://localhost:3005/areas/" + id).then(() => {
      console.log("bye bye");
      getAreas();
    });
  }

  function getLinha(area){
    return (
      <tr>
        <td>{area._id}</td>
        <td>{area.descricao}</td>
        <td>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da área " + area.descricao + "?"
                )
              ) {
                excluirArea(area._id);
              }
            }}
          >
            Excluir
          </button>
          <button onClick={()=>{
            editarArea(area);
          }} >Editar</button>
        </td>
      </tr>
    );
  }

  function getLinhas() {
    const linhas = [];
    for(let i = 0; i < areas.length; i++){
      const area = areas[i];
      linhas[i] = getLinha(area);
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
          <input type="text" value={area.nome}/>
          <label>Endereço</label>
          <input type="text" value={area.endereco}/>
          <label>Data de Nascimento</label>
          <input type="text" value={area.data_nasc}/>
          <label>CPF</label>
          <input type="text" value={area.cpf}/>
          <label>Contato</label>
          <input type="text" value={area.contato}/>
          
          

              onChange={(event)=>{
                onChangeArea(event, area._id);
              }}
          
          <button onClick={salvarArea}>Salvar</button>
          <button onClick={cancelar} >Cancelar</button>
        </form>
    );
  }

  function getConteudo(){
    if(area){
      return getFormulario();
    } else {
      return (
        <>
            <button onClick={novaArea} >Adicionar Cliente</button>
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
