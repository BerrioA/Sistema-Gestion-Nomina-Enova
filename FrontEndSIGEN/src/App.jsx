import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import  Login  from "./Components/Login/Login.jsx";
import { Admins } from "./pages/Admins.jsx";
import { Empleados } from "./pages/Empleados.jsx";
import { AgregarAdmin } from "./pages/AgregarAdmin.jsx";
import { EditarAdministrador } from "./pages/EditarAdministrador.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/administradores" element={<Admins />} />
          <Route path="/administradores/agregar" element={<AgregarAdmin />} />
          <Route path="/administradores/editar/:id" element={<EditarAdministrador />} />
          <Route path="/empleados" element={<Empleados />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
