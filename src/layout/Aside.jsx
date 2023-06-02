import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/cadastros">Clientes</NavLink>
        </li>
        <li>
          <NavLink to="/produtos">Produtos</NavLink>
        </li>
        
      </ul>
    </aside>
  );
}

export default Aside;
