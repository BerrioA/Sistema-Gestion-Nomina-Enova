import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Administradores = db.define(
  "administradores",
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
      unique: {
        msg: "Este correo ya está en uso", 
      },
      validate: {
        notEmpty: {
          msg: "El correo no puede estar vacío",
        },
        isEmail: {
          msg: "El formato del correo no es válido",
        },
        len: {
          args: [11, 100],
          msg: "El correo debe tener entre 11 y 100 caracteres",
        },
        is: {
          args: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          msg: "El formato del correo es inválido",
        },
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
    rol: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Administradores;
