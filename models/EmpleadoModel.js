import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Coordinadores from "./CoordinadorModel.js";
import Nominas from "./NominaModel.js"

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
      allowNull: true,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
        is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      },
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
        is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      },
    },
    cc: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 10000,
      },
    },
    banco: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
    numcuenta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 20],
        is: /^[0-9+]+$/,
      },
    },
    honomensual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    coordinadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: false,
      },
    },
  },
  {
    freezeTableName: true,
    hooks: {
      async beforeCreate(empleado) {
        const coordinador = await Coordinadores.findByPk(
          empleado.coordinadorId
        );
        if (coordinador) {
          empleado.sede = coordinador.sede;
        }
      },
    },
  }
);


Coordinadores.hasMany(Empleados, {
  foreignKey: "coordinadorId",
  onDelete: "CASCADE",
});
Empleados.belongsTo(Coordinadores, {
  foreignKey: "coordinadorId",
  onDelete: "CASCADE",
});

export default Empleados;
