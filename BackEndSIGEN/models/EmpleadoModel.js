import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Coordinadores from "./CoordinadorModel.js";

const { DataTypes } = Sequelize;

const Empleados = db.define(
  "empleado",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    banco: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    numcuenta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    honomensual: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
    },
    coordinadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    hooks: {
      // Hook beforeCreate para asignar el site del coordinador al empleado
      async beforeCreate(empleado) {
        const coordinador = await Coordinadores.findByPk(
          empleado.coordinadorId
        );
        if (coordinador) {
          empleado.site = coordinador.site; // Asigna el site del coordinador al empleado
        }
      },
    },
  }
);

// Definición explícita del nombre de la clave foránea
Coordinadores.hasMany(Empleados, { foreignKey: "coordinadorId" });
Empleados.belongsTo(Coordinadores, { foreignKey: "coordinadorId" });

export default Empleados;
