import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Administradores from "./AdminModel.js";

const { DataTypes } = Sequelize;

const Coordinadores = db.define(
  "coordinador",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
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
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [11, 100],
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100],
      },
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Administradores.hasMany(Coordinadores, { foreignKey: "administradorId" });
Coordinadores.belongsTo(Administradores, { foreignKey: "administradorId" });

export default Coordinadores;
