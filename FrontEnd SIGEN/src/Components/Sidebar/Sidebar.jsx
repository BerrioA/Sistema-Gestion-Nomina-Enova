import {
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaChartPie,
  FaUsers,
  FaBuilding,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdBackupTable } from "react-icons/md";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="container-titulo">
        <MdBackupTable className="ico"/>
        <h1>SIGEN</h1>
      </div>
      <ul>
        <li>
          <FaTachometerAlt className="icon" />
          <span>Dashboard</span>
        </li>
        <li>
          <FaMoneyCheckAlt className="icon" />
          <span>Nóminas</span>
        </li>
        <li>
          <FaChartPie className="icon" />
          <span>Consolidado</span>
        </li>
        <li>
          <FaUsers className="icon" />
          <span>Lista de empleados</span>
        </li>
        <li>
          <FaBuilding className="icon" />
          <span>Agregar sede</span>
        </li>
        <li>
          <FaSignOutAlt className="icon" />
          <span>Salir</span>
        </li>
      </ul>
    </div>
  );
};
