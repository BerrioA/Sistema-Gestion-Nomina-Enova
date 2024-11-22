import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empleados from "./EmpleadoModel.js";
import Coordinadores from "./CoordinadorModel.js";
import moment from "moment";
import { Op } from "sequelize";

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
        notEmpty: {
          msg: "⚠️ El campo de honorario quincenal no puede estar vacío.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser numérico y con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El valor no puede ser menor a 0.",
        },
      },
    },
    honodia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ El honorario por día es obligatorio.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser un número con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El honorario diario no puede ser menor a 0.",
        },
      },
    },
    totaldiasliquidar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar la cantidad de días a liquidar.",
        },
        isInt: {
          msg: "🔢 Los días deben ser un número entero.",
        },
        min: {
          args: [0],
          msg: "📅 Los días a liquidar no pueden ser menos de 0.",
        },
        max: {
          args: [15],
          msg: "📅 No puedes liquidar más de 15 días.",
        },
      },
    },
    clasesapoyosena: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar la cantidad de clases de apoyo SENA.",
        },
        isInt: {
          msg: "🔢 Las clases deben ser un número entero.",
        },
        min: {
          args: [0],
          msg: "📚 No puedes tener menos de 0 clases.",
        },
        max: {
          args: [60],
          msg: "📚 No puedes tener más de 60 clases.",
        },
      },
    },
    valorclaseapoyosena: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar el valor de la clase de apoyo SENA.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser numérico con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El valor no puede ser menor a 0.",
        },
      },
    },
    diasdominicales: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar la cantidad de días dominicales.",
        },
        isInt: {
          msg: "🔢 Los días dominicales deben ser un número entero.",
        },
        min: {
          args: [0],
          msg: "📅 No puedes tener menos de 0 días dominicales.",
        },
        max: {
          args: [20],
          msg: "📅 No puedes tener más de 20 días dominicales.",
        },
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
    valordiadominical: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar el valor por día dominical.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser un número decimal.",
        },
        min: {
          args: [0],
          msg: "💸 El valor por día dominical no puede ser menor a 0.",
        },
      },
    },
    clasesintructor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar la cantidad de clases como instructor.",
        },
        isInt: {
          msg: "🔢 Las clases deben ser un número entero.",
        },
        min: {
          args: [0],
          msg: "📚 No puedes tener menos de 0 clases.",
        },
        max: {
          args: [60],
          msg: "📚 No puedes tener más de 60 clases.",
        },
      },
    },
    valorclaseinstructor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar el valor de la clase como instructor.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser numérico con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El valor no puede ser menor a 0.",
        },
      },
    },
    totalinscripcionesliquidar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar la cantidad de inscripciones a liquidar.",
        },
        isInt: {
          msg: "🔢 Las inscripciones deben ser un número entero.",
        },
        min: {
          args: [0],
          msg: "📄 No puedes tener menos de 0 inscripciones.",
        },
        max: {
          args: [60],
          msg: "📄 No puedes tener más de 60 inscripciones.",
        },
      },
    },
    valorcomisioninscripcion: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar el valor de la comisión por inscripción.",
        },
        isDecimal: {
          msg: "🔢 El valor debe ser numérico con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El valor no puede ser menor a 0.",
        },
      },
    },
    totalpagar: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ El total a pagar no puede estar vacío.",
        },
        isDecimal: {
          msg: "🔢 El total debe ser numérico con decimales.",
        },
        min: {
          args: [0],
          msg: "💸 El total a pagar no puede ser menor a 0.",
        },
      },
    },
    deducciones: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: {
          msg: "🔢 Las deducciones deben ser numéricas.",
        },
        min: {
          args: [0],
          msg: "💸 Las deducciones no pueden ser menores a 0.",
        },
      },
    },
    saldopendiente: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ Debes ingresar el saldo pendiente.",
        },
        isDecimal: {
          msg: "🔢 El saldo debe ser un número decimal.",
        },
        min: {
          args: [0],
          msg: "💸 El saldo pendiente no puede ser menor a 0.",
        },
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
        notEmpty: {
          msg: "⚠️ El ID del empleado es obligatorio.",
        },
      },
    },
    coordinadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ El ID del coordinador es obligatorio.",
        },
      },
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    periodo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "⚠️ El campo periodo es obligatorio.",
        },
        isInt: {
          msg: "🔢 El periodo debe ser un número entero (1 o 2).",
        },
        min: {
          args: [1],
          msg: "📅 El periodo debe ser 1 o 2.",
        },
        max: {
          args: [2],
          msg: "📅 El periodo debe ser 1 o 2.",
        },
      },
    },
  },
  {
    freezeTableName: true,
    hooks: {
      async beforeCreate(nomina) {
        const diaActual = moment().date();
        const mesActual = moment().month();
        const inicioMes = moment().startOf("month").toDate();
        const finMes = moment().endOf("month").toDate();

        // Validación de los días permitidos por cada periodo
        const diasPeriodo1 = [1, 2, 3, 4, 5];
        const diasPeriodo2 = [15, 16, 17, 18, 19];

        if (![...diasPeriodo1, ...diasPeriodo2].includes(diaActual)) {
          throw new Error(
            "La nómina solo puede ser creada los días 1, 2, 3, 4, 5, 15, 16, 17, 18 y 19 de cada mes."
          );
        }

        const periodo = diasPeriodo1.includes(diaActual) ? 1 : 2;

        const nominaExistente = await Nomina.findOne({
          where: {
            empleadoId: nomina.empleadoId,
            periodo: periodo,
            createdAt: {
              [Op.between]: [inicioMes, finMes],
            },
          },
        });

        if (nominaExistente) {
          throw new Error(
            `Ya existe una nómina para este empleado en el periodo ${periodo} de este mes.`
          );
        }

        const coordinador = await Coordinadores.findByPk(nomina.coordinadorId);
        if (coordinador) {
          nomina.sede = coordinador.sede;
        }

        nomina.periodo = periodo;
      },

      async beforeUpdate(nomina) {
        const diaActual = moment().date();
        const periodo = nomina.periodo;

        // Permitir edición solo dentro del rango de días del periodo respectivo
        const diasPermitidos =
          periodo === 1 ? [1, 2, 3, 4, 5] : [15, 16, 17, 18, 19];
        if (!diasPermitidos.includes(diaActual)) {
          throw new Error(
            `Solo puedes editar la nómina durante los días del periodo ${periodo}.`
          );
        }
      },
    },
  }
);

Empleados.hasMany(Nomina, { foreignKey: "empleadoId", onDelete: "CASCADE" });
Nomina.belongsTo(Empleados, { foreignKey: "empleadoId" });

Coordinadores.hasMany(Nomina, {
  foreignKey: "coordinadorId",
  onDelete: "CASCADE",
});
Nomina.belongsTo(Coordinadores, { foreignKey: "coordinadorId" });

export default Nomina;
