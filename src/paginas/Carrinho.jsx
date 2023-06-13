import "./Cadastros.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

//npm install react-select
//Estilos do componente react-select
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
  //Entidades e listas utilizadas na página
  const [linha, setLinha] = useState(null);
  const [linhas, setLinhas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areasSelecionadas, setAreasSelecionadas] = useState();
  const [cursos, setCursos] = useState([]);
  const [cursosSelecionados, setCursosSelecionados] = useState();
 
  //Funções de carregamento de dados do backend
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

  //Funções para manipulação da entidade principal
  function novaLinha() {
    setLinha({
      areas: [],
      cursos: [],
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
    setAreasSelecionadas();
    setCursosSelecionados();

  }

  //Funções para a construção da tela
  //Caixa de seleção de ÁREAS
  function getSelectAreas() {
    const vetAreas = [];
    const areasAnteriores = [];
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      if (linha.areas.includes(area._id)) {
        areasAnteriores[i] = {
          value: area._id,
          label: area.nome,
        };
      }
      vetAreas[i] = {
        value: area._id,
        label: area.nome,
      };
    }

    return (
      <Select
        isMulti
        isClearable={false}
        value={areasSelecionadas}
        defaultValue={areasAnteriores}
        onChange={onChangeSelectAreas}
        options={vetAreas}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectAreas(valores) {
    setAreasSelecionadas(valores);
    const areasIds = [];
    for (let i = 0; i < valores.length; i++) {
      areasIds[i] = valores[i].value;
    }
    alterarLinha("areas", areasIds, linha._id);
  }

  //Caixa de seleção de CURSOS
  function getSelectCursos() {
    const vetCursos = [];
    const cursosAnteriores = [];
    for (let i = 0; i < cursos.length; i++) {
      const curso = cursos[i];
      if (linha.cursos.includes(curso._id)) {
        cursosAnteriores[i] = {
          value: curso._id,
          label: curso.nome,
        };
      }
      vetCursos[i] = {
        value: curso._id,
        label: curso.nome,
      };
    }

    return (
      <Select
        isMulti
        isClearable={false}
        value={cursosSelecionados}
        defaultValue={cursosAnteriores}
        onChange={onChangeSelectCursos}
        options={vetCursos}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectCursos(valores) {
    setCursosSelecionados(valores);
    const cursosIds = [];
    for (let i = 0; i < valores.length; i++) {
      cursosIds[i] = valores[i].value;
    }
    alterarLinha("cursos", cursosIds, linha._id);
  }


  //Função para geração do formulário
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

  //Funções para geração da tabela
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
    const linhasDaTabela = [];
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i];
      linhasDaTabela[i] = getLinhaDaTabela(linha);
    }
    return linhasDaTabela;
  }

  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Ações</th>
            <th>Produto</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  //Função do conteúdo principal
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
