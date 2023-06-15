import { NavLink } from 'react-router-dom';

function Nav(){
return (

  <nav class="navbar">
  <ul>
    <li><NavLink to="/">Home</NavLink></li>
    <li class="dropdown">
      <a href="#services">Serviços</a>
      <div class="dropdown-content">
      <NavLink to="/carrinho">Carrinho</NavLink>
      <NavLink to="/Cadastro_cliente">Clientes</NavLink>
      <NavLink to="/Cadastro_produto">Produtos</NavLink>
      </div>
    </li>
    <li><NavLink to="/sobre">Sobre</NavLink></li>
  </ul>
</nav>
  );
}


export default Nav;