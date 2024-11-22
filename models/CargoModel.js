import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Cargos = db.define(
  "cargos",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nombrecargo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ya existe un cargo con este nombre.",
      },
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

// Cargos iniciales
const initialCargos = [
  "Diseñadora Grafica",
  "Tecnico",
  "Talento Humano",
  "Asistente Comercial",
  "Control Interno",
  "Asesora Comercial",
  "Coordinador Administrativo",
  "Lider Comercial",
  "Coordinadora Administrativa",
  "Aux. Administrativo",
];

// Función para inicializar la tabla y los datos
export const initializeCargos = async () => {
  try {
    // Sincronizar tabla si es necesario
    await Cargos.sync();

    // Insertar cargos iniciales si no existen
    for (const nombre of initialCargos) {
      await Cargos.findOrCreate({
        where: { nombrecargo: nombre },
      });
    }
    console.log("Cargos iniciales cargados correctamente.");
  } catch (error) {
    console.error("Error al inicializar los cargos:", error);
  }
};

export default Cargos;
