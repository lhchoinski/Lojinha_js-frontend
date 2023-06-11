import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";


function Cadastro_produto() {

  
    const [produto, setProduto] = useState(null);
    const [produtos, setProdutos] = useState([]);
  
  
  
    function novoProduto(){
        setProduto({
          nome: ""
        });
    }
  
    function cancelar(){
      setProduto(null);
    }
  
    function editarProduto(produto){
      
  }
  
  function salvarProduto(){
    if(produto._id){
      axios.put("http://localhost:3000/produto/" + produto._id, produto).then((res)=> {
        refresh();
      });
    } else {
      axios.post("http://localhost:3000/produto", produto).then((res)=> {
        refresh();
      });
    }
  }
  
    function refresh(){
      cancelar();
      getProdutos();
    }
  
    function alterarProduto(campo, valor, id) {
      setProduto({
        _id: id,
        [campo]: valor,
      });
    }
  
  
    function getProdutos() {
      console.log("Passou por aqui...");
      axios.get("http://localhost:3000/produto").then((resposta) => {
        setProdutos(resposta.data);
        console.log(resposta.data)
      });
    }
  
    useEffect(getProdutos, []);
  
    function excluirProduto(id) {
      axios.delete("http://localhost:3000/produto/" + id).then(() => {
        console.log("bye bye");
        getProdutos();
      });
    }
  
    function getLinha(produto){
      return (
        <tr>
          <td>{produto._id}</td>
          <td>{produto.nome}</td>
          <td>{produto.descricao}</td>
          <td>{produto.marca}</td>
          <td>{produto.preco}</td>
          <td>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Confirmar a exclusão do produto " + produto.nome + "?"
                  )
                ) {
                  excluirProduto(produto._id);
                }
              }}
            >
              Excluir
            </button>
            <button onClick={()=>{
              editarProduto(produto._id);
            }} >Editar</button>
          </td>
        </tr>
      );
    }
  
    function getLinhas() {
      const linhas = [];
      for(let i = 0; i < produtos.length; i++){
        const produto = produtos[i];
        linhas[i] = getLinha(produto);
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
            <th>Descrição</th>
            <th>Marca</th>
            <th>preço</th>
            <th>Opçoes :</th>
          </tr>
          {getLinhas()}
        </table>
      );
    }
  
    function getFormulario(){
      return (
          <form>
            <label>Nome</label>
            <input type="text" name="nome" value={produto.nome}
             onChange={(e) => {
              alterarCliente(e.target.name, e.target.value, produto._id);
            }}
  
           />
            <label>Descrição</label>
            <input type="text" name="endereco" value={produto.endereco}
            />
            <label>Marca</label>
            <input type="text" value={produto.data_nasc}
            />
            <label>Preço</label>
            <input type="text" value={produto.cpf}
            />
            <button onClick={salvarProduto}>Salvar</button>
            <button onClick={cancelar} >Cancelar</button>
          </form>
  
          
      );
    }
  
    function getConteudo(){
      if(produto){
        return getFormulario();
      } else {
        return (
          <>
              <button onClick={novoProduto} >Adicionar Produto</button>
              {getTabela()}
          </>
        );
      }
    }
  
    return (
      <div className="cadastros">
  
        <div className="conteudo">
          <h2>Cadastro de Produtos</h2>
          {getConteudo()}
        </div>
      </div>
    );
  
}
export default Cadastro_produto;
