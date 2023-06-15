import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    padding: "5px 0",
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function Carrinho() {
  const [linha, setLinha] = useState(null);
  const [linhas, setLinhas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [areasSelecionadas, setAreasSelecionadas] = useState([]);
  const [cursosSelecionados, setCursosSelecionados] = useState([]);

  function getLinhas() {
    axios.get("http://localhost:3000/pedido").then((resposta) => {
      setLinhas(resposta.data);
    });
  }

  function getAreas() {
    axios.get("http://localhost:3000/cliente").then((resposta) => {
      setAreas(resposta.data);
    });
  }

  function getCursos() {
    axios.get("http://localhost:3000/produto").then((resposta) => {
      setCursos(resposta.data);
    });
  }

  useEffect(() => {
    getAreas();
    getLinhas();
    getCursos();
  }, []);

  function novaLinha() {
    setLinha({
      cliente: "",
      produto: "",
    });
  }

  function alterarLinha(campo, valor, id) {
    linha[campo] = valor;
    setLinha({
      _id: id,
      ...linha,
    });
  }

  function excluirLinha(id) {
    axios.delete("http://localhost:3000/pedido/" + id).then(() => {
      reiniciarEstadoDosObjetos();
    });
  }

  function salvarLinha() {
    if (linha._id) {
      axios.put("http://localhost:3000/pedido/" + linha._id, linha).then(() => {
        reiniciarEstadoDosObjetos();
      });
    } else {
      axios.post("http://localhost:3000/pedido", linha).then(() => {
        reiniciarEstadoDosObjetos();
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setLinha(null);
    getLinhas();
    setAreasSelecionadas([]);
    setCursosSelecionados([]);
  }

  function onChangeSelectAreas(valores) {
    setAreasSelecionadas(valores);
    const areasNomes = valores.map((valor) =>
      areas.find((area) => area._id === valor.value).nomeCliente
    );
    alterarLinha("cliente", areasNomes, linha._id);
  }

  function onChangeSelectCursos(valores) {
    setCursosSelecionados(valores);
    const cursosNomes = valores.map((valor) =>
      cursos.find((curso) => curso._id === valor.value).nomeProduto
    );
    alterarLinha("produto", cursosNomes, linha._id);
  }

  function getSelectAreas() {
    const vetAreas = areas.map((area) => ({
      value: area._id,
      label: area.nomeCliente,
    }));

    return (
      <Select
        isMulti
        isClearable={false}
        value={areasSelecionadas}
        onChange={onChangeSelectAreas}
        options={vetAreas}
        styles={selectStyles}
      />
    );
  }

  function getSelectCursos() {
    const vetCursos = cursos.map((curso) => ({
      value: curso._id,
      label: curso.nomeProduto,
    }));

    return (
      <Select
        isMulti
        isClearable={false}
        value={cursosSelecionados}
        onChange={onChangeSelectCursos}
        options={vetCursos}
        styles={selectStyles}
      />
    );
  }

  function getFormulario() {
    return (
      <form>
        <label>Clientes</label>
        {getSelectAreas()}
        <label>Produtos</label>
        {getSelectCursos()}
        <button
          type="button"
          onClick={() => {
            salvarLinha();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            reiniciarEstadoDosObjetos();
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  function getLinhaDaTabela(linha) {
    return (
      <tr key={linha._id}>
        <td>{linha._id}</td>
        <td>{linha.cliente}</td>
        <td>{linha.produto}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Confirmar a exclusão da linha " + linha._id + "?"
                )
              ) {
                excluirLinha(linha._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              setLinha(linha);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  function getLinhasDaTabela() {
    return linhas.map((linha) => getLinhaDaTabela(linha));
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  function getConteudo() {
    if (linha == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novaLinha();
            }}
          >
            Novo Pedido
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  return (
    <div className="cadastros">
      <div className="conteudo">
        <h2>Realizar Pedido</h2>
        {getConteudo()}
      </div>
    </div>
  );
}

export default Carrinho;
