import { NavLink } from "react-router-dom";

function Aside() {
  return (
    <aside className="menu-lateral">
      <ul>
        <li>
          <NavLink to="/cadastros">Clientes</NavLink>
        </li>
        <li>
          <NavLink to="/atitudes">Produtos</NavLink>
        </li>
        
      </ul>
    </aside>
  );
}

export default Aside;
