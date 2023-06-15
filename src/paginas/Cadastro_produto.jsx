import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";

function Cadastro_produto() {
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);

  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  

  function EnviandoBancoProd() {
    const formData = {
      nomeProduto: name,
      descricao: descricao,
      marca: marca,
      preco: preco,
    };

    axios
      .post("http://localhost:3000/produto", formData)
      .then(response => {
        alert("Dados Salvos com sucesso");
        setName("");
        setDescricao("");
        setMarca("");
        setPreco("");
        setProdutos(); // Atualiza a lista de clientes após o salvamento bem-sucedido
        getProdutos();
      })
      .catch(error => {
        console.error("Erro ao enviar os dados:", error);
      });
  }

  function cancelar() {
    setProduto(null);
  }

  function editarProduto(produto) {
    // Implemente a lógica de edição do cliente aqui
  }

  function getProdutos() {
    console.log("Passou por aqui...");
    axios.get("http://localhost:3000/produto").then(resposta => {
      setProdutos(resposta.data);
      console.log(resposta.data);
    });
  }

  useEffect(getProdutos, []);

  function excluirProduto(id) {
    axios.delete("http://localhost:3000/produto/" + id).then(() => {
      console.log("bye bye");
      getProdutos();
    });
  }

  function getLinha(produto) {
    return (
      <tr key={produto._id}>
        <td>{produto._id}</td>
        <td>{produto.nomeProduto}</td>
        <td>{produto.descricao}</td>
        <td>{produto.marca}</td>
        <td>{produto.preco}</td>
        
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão do cliente " + produto.descricao + "?"
                )
              ) {
                excluirProduto(produto._id);
              }
            }}
          >
            
            Excluir
          </button>
          <button
            onClick={() => {
              editarProduto(produto._id);
            }}
          >
            Editar
          </button>
        
      </tr>
    );
  }
      //erro ao voltar para a pagina onde exibe os produtos
      //Cannot read properties of undefined (reading 'map')sss
  function getLinhas() {
    return produtos.map(produto => getLinha(produto));
  }

  function getTabela() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descricao</th>
            <th>Marca</th>
            <th>Preço</th>
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
        <label>Descrição</label>
        <input
          type="text"
          name="descricao"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <label>Marca</label>
        <input
          type="text"
          name="marca"
          value={marca}
          onChange={e => setMarca(e.target.value)}
        />
        <label>preco</label>
        <input
          type="text"
          name="preco"
          value={preco}
          onChange={e => setPreco(e.target.value)}
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
    if (produto) {
      return getFormulario();
    } else {
      return (
        <>
          <button onClick={() => setProduto(true)}>Adicionar Produto</button>
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