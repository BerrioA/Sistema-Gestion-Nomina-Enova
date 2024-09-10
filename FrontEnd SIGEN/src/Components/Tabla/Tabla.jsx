import "./Tabla.css";

export const Tabla = () => {
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alejandro</td>
            <td>Berrio</td>
            <td>30</td>
            <td>alejandro@example.com</td>
          </tr>
          <tr>
            <td>Maria</td>
            <td>Gomez</td>
            <td>25</td>
            <td>maria@example.com</td>
          </tr>
          <tr>
            <td>Carlos</td>
            <td>Pérez</td>
            <td>28</td>
            <td>carlos@example.com</td>
          </tr>
          <tr>
            <td>Sofía</td>
            <td>Rodríguez</td>
            <td>22</td>
            <td>sofia@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
