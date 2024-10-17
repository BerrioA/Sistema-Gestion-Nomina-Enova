import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empleados from "./EmpleadoModel.js";
import Coordinadores from "./CoordinadorModel.js";
import moment from "moment";

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
        // Validar fechas permitidas
        const diasPermitidos = [1, 2, 3, 15, 16, 17];
        const diaActual = moment().date();
        if (!diasPermitidos.includes(diaActual)) {
          throw new Error(
            "La nómina solo puede ser creada los días 1, 2, 3, 15, 16, 17 del mes."
          );
        }

        // Verificar si ya existe una nómina para el empleado en el mismo mes
        const inicioMes = moment().startOf("month").toDate();
        const finMes = moment().endOf("month").toDate();

        const nominaExistente = await Nomina.findOne({
          where: {
            empleadoId: nomina.empleadoId,
            createdAt: {
              [Op.between]: [inicioMes, finMes],
            },
          },
        });

        if (nominaExistente) {
          throw new Error(
            "Ya existe una nómina para este empleado en este mes."
          );
        }

        // Asignar sede automáticamente basado en el coordinador
        const coordinador = await Coordinadores.findByPk(nomina.coordinadorId);
        if (coordinador) {
          nomina.sede = coordinador.sede;
        }
      },
    },
  }
);

Empleados.hasMany(Nomina, {
  foreignKey: "empleadoId",
  onDelete: "CASCADE",
});
Nomina.belongsTo(Empleados, { foreignKey: "empleadoId" });

Coordinadores.hasMany(Nomina, {
  foreignKey: "coordinadorId",
  onDelete: "CASCADE",
});
Nomina.belongsTo(Coordinadores, { foreignKey: "coordinadorId" });

export default Nomina;