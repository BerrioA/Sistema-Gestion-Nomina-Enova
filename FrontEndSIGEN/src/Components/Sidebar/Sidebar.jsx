import { NavLink } from "react-router-dom";
import { MdDashboard, MdAssessment } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { FaUserTie, FaFileInvoiceDollar } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <MdDashboard /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/administradores"}>
              <FiUsers /> Administradores
            </NavLink>
          </li>
          <li>
            <NavLink to={"/empleados"}>
              <FaUserTie /> Empleados
            </NavLink>
          </li>
          <li>
            <NavLink to={"/nominas"}>
              <FaFileInvoiceDollar /> Nóminas
            </NavLink>
          </li>
          <li>
            <NavLink to={"/consolidado"}>
              <MdAssessment /> Consolidado
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Ajustes</p>
        <ul className="menu-list">
          <li>
            <button className="button is-white">
              <FiLogOut />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};
