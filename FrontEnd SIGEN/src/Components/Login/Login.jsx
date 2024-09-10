import "./Login.css";
import Logo from "../../assets/Images/LOGO-ACET.png";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdBackupTable } from "react-icons/md";

const InfoSigen = () => (
  <div className="titulo">
    <div className="container-titulo">
      <MdBackupTable />
      <h1>SIGEN</h1>
    </div>
    <p>Sistema Integrado de Gestión de Nóminas.</p>
  </div>
);

export const Login = () => (
  <div className="container">
    <div className="container-login">
      <div className="container-input">
        <p className="texto-bienvenido">BIENVENIDO A</p>
        <InfoSigen />
        <form>
          <div className="inputs-target">
            <FaRegUser className="input-icon" />
            <input type="text" placeholder="Ingrese su usuario" />
          </div>
          <div className="inputs-target">
            <RiLockPasswordLine className="input-icon" />
            <input type="password" placeholder="Ingrese su contraseña" />
          </div>
          <button className="btn-login">Iniciar Sesión</button>
        </form>
      </div>
      <div className="container-info">
        <div className="info-overlay"></div>
        <img
          className="logo-academia"
          src={Logo}
          alt="Logo de Academia Enova Tecnología"
        />
        <p>
          Aprende & Practica con nuestros cursos complementarios. Capacitaciones
          a nivel nacional.
        </p>
      </div>
    </div>
  </div>
);
