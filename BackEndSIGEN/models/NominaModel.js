import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empleados from "./EmpleadoModel.js";
import Coordinadores from "./CoordinadorModel.js";

const { DataTypes } = Sequelize;

const Nomina = db.define(
  "nomina",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    honoquincena: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    honodia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    totaldiasliquidar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 15,
      },
    },
    clasesapoyosena: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 60,
      },
    },
    valorclaseapoyosena: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    diasdominicales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 20,
      },
    },
    valordiadominical: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    clasesintructor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 60,
      },
    },
    valorclaseinstructor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    totalinscripcionesliquidar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true,
        min: 0,
        max: 60,
      },
    },
    valorcomisioninscripcion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    honoperiodoliquidacion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    valortotalclasesapoyosena: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    valortotaldominicales: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    valortotalclasesinstructor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    comicioninscripcionestudiante: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    totalpagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    pagosadicionalespendientes: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    deducciones: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    saldopendiente: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: true,
        min: 0,
      },
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    empleadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDecimal: false,
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
    sede: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      async beforeCreate(nomina) {
        const coordinador = await Coordinadores.findByPk(nomina.coordinadorId);
        if (coordinador) {
          nomina.sede = coordinador.sede;
        }
      },
    },
  }
);

// Relación de Nomina con Empleados
Empleados.hasMany(Nomina, { foreignKey: "empleadoId" });
Nomina.belongsTo(Empleados, { foreignKey: "empleadoId" });

// Relación de Coordinadores con las nómimas
Coordinadores.hasMany(Nomina, { foreignKey: "coordinadorId" });
Nomina.belongsTo(Coordinadores, { foreignKey: "coordinadorId" });

export default Nomina;
