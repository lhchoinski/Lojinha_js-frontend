import { NavLink } from 'react-router-dom';

function Nav(){
return (

<div class="navbar">
<a><NavLink to="/">Home</NavLink></a>
<a><NavLink to="/carrinho">Carrinho</NavLink></a>
<a><NavLink to="/sobre">Sobre</NavLink></a>
<div class="dropdown">
  <button class="dropbtn">Cadastros
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-content">
    <a><NavLink to="/Cadastro_cliente">Clientes</NavLink></a>
    <a><NavLink to="/Cadastro_produto">Produtos</NavLink></a>
  </div>
</div>
</div>
  );
}

export default Nav;