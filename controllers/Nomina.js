import Nomina from "../models/NominaModel.js";
import Empleado from "../models/EmpleadoModel.js";
import Coordinadores from "../models/CoordinadorModel.js";
import moment from "moment";
import { Op } from "sequelize";

// Función para mostrar todas las nóminas
export const getNominas = async (req, res) => {
  try {
    const { sede, periodo, fechaInicio, fechaFin } = req.query; // Parámetros opcionales
    const whereConditions = {}; // Condiciones dinámicas para el filtro

    // Filtros opcionales
    if (sede) {
      whereConditions.sede = sede;
    }
    if (periodo) {
      whereConditions.periodo = periodo;
    }
    if (fechaInicio && fechaFin) {
      whereConditions.createdAt = {
        [Op.between]: [
          moment(fechaInicio).startOf("day").toDate(),
          moment(fechaFin).endOf("day").toDate(),
        ],
      };
    }

    let response;
    if (req.rol === "Administrador") {
      response = await Nomina.findAll({
        attributes: [
          "uuid",
          "honoquincena",
          "honodia",
          "totaldiasliquidar",
          "clasesapoyosena",
          "valorclaseapoyosena",
          "diasdominicales",
          "valordiadominical",
          "clasesintructor",
          "valorclaseinstructor",
          "totalinscripcionesliquidar",
          "valortotaldominicales",
          "valortotalclasesinstructor",
          "comicioninscripcionestudiante",
          "totalpagar",
          "deducciones",
          "saldopendiente",
          "empleadoId",
          "coordinadorId",
          "observaciones",
          "sede",
          "periodo",
        ],
        where: whereConditions, // Aplica los filtros aquí
        include: [
          {
            model: Empleado,
            attributes: [
              "nombre",
              "apellido",
              "cc",
              "banco",
              "numcuenta",
              "honomensual",
              "sede",
              "cargo",
            ],
          },
          {
            model: Coordinadores,
            attributes: ["nombre", "correo"],
          },
        ],
      });
    } else if (req.rol === "Coordinador") {
      whereConditions.coordinadorId = req.coordinadorId; // Restricción adicional para el coordinador
      response = await Nomina.findAll({
        attributes: [
          "uuid",
          "honoquincena",
          "honodia",
          "totaldiasliquidar",
          "clasesapoyosena",
          "valorclaseapoyosena",
          "diasdominicales",
          "valordiadominical",
          "clasesintructor",
          "valorclaseinstructor",
          "totalinscripcionesliquidar",
          "valortotaldominicales",
          "valortotalclasesinstructor",
          "comicioninscripcionestudiante",
          "totalpagar",
          "deducciones",
          "observaciones",
          "saldopendiente",
          "empleadoId",
          "sede",
          "periodo",
        ],
        where: whereConditions,
        include: [
          {
            model: Empleado,
            attributes: [
              "uuid",
              "nombre",
              "apellido",
              "cc",
              "banco",
              "numcuenta",
              "honomensual",
              "sede",
              "cargo",
            ],
          },
        ],
      });
    } else {
      return res.status(403).json({ msg: "Acceso denegado." });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Función para mostrar una nómina por ID (uuid)
export const getNominaById = async (req, res) => {
  try {
    const response = await Nomina.findOne({
      attributes: [
        "uuid",
        "honoquincena",
        "honodia",
        "totaldiasliquidar",
        "clasesapoyosena",
        "valorclaseapoyosena",
        "diasdominicales",
        "valordiadominical",
        "clasesintructor",
        "valorclaseinstructor",
        "totalinscripcionesliquidar",
        "valortotaldominicales",
        "valortotalclasesinstructor",
        "comicioninscripcionestudiante",
        "totalpagar",
        "deducciones",
        "saldopendiente",
        "observaciones",
        "empleadoId",
        "coordinadorId",
        "sede",
        "periodo",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "Nómina no encontrada" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Función para crear una nómina
export const createNomina = async (req, res) => {
  const {
    honoquincena,
    honodia,
    totaldiasliquidar,
    clasesapoyosena,
    valorclaseapoyosena,
    diasdominicales,
    valordiadominical,
    clasesintructor,
    valorclaseinstructor,
    totalinscripcionesliquidar,
    valorcomisioninscripcion,
    valortotaldominicales,
    valortotalclasesinstructor,
    comicioninscripcionestudiante,
    totalpagar,
    deducciones,
    saldopendiente,
    observaciones,
    empleadoId,
  } = req.body;

  try {
    // Verificar si el empleado existe
    const empleado = await Empleado.findOne({ where: { id: empleadoId } });
    if (!empleado) {
      return res.status(404).json({ msg: "El empleado no existe." });
    }

    // Validar los periodos y fechas permitidas
    const diaActual = moment().date();
    const diasPeriodo1 = [1, 2, 3, 4, 5];
    const diasPeriodo2 = [15, 16, 17, 18, 19];

    if (![...diasPeriodo1, ...diasPeriodo2].includes(diaActual)) {
      return res.status(400).json({
        msg: "Ups, la nómina solo puede ser creada los días 1, 2, 3, 4,5, 15, 16, 17, 18, 19 de cada mes.",
      });
    }

    const periodo = diasPeriodo1.includes(diaActual) ? 1 : 2;

    // Verificar si ya existe una nómina para ese empleado
    const inicioMes = moment().startOf("month").toDate();
    const finMes = moment().endOf("month").toDate();
    const nominaExistente = await Nomina.findOne({
      where: {
        empleadoId,
        periodo,
        createdAt: {
          [Op.between]: [inicioMes, finMes],
        },
      },
    });

    if (nominaExistente) {
      return res.status(400).json({
        msg: `Ya existe una nómina para este empleado en el periodo ${periodo} de este mes.`,
      });
    }

    // Crear la nómina
    await Nomina.create({
      honoquincena: honoquincena,
      honodia: honodia,
      totaldiasliquidar: totaldiasliquidar,
      clasesapoyosena: clasesapoyosena,
      valorclaseapoyosena: valorclaseapoyosena,
      diasdominicales: diasdominicales,
      valordiadominical: valordiadominical,
      clasesintructor: clasesintructor,
      valorclaseinstructor: valorclaseinstructor,
      totalinscripcionesliquidar: totalinscripcionesliquidar,
      valorcomisioninscripcion: valorcomisioninscripcion,
      valortotaldominicales: valortotaldominicales,
      valortotalclasesinstructor: valortotalclasesinstructor,
      comicioninscripcionestudiante: comicioninscripcionestudiante,
      totalpagar: totalpagar,
      deducciones: deducciones,
      saldopendiente: saldopendiente,
      observaciones: observaciones,
      empleadoId: empleadoId,
      coordinadorId: req.coordinadorId,
      sede: empleado.sede,
      periodo,
    });

    res.status(201).json({ msg: "¡Nómina registrada con éxito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateNomina = async (req, res) => {
  try {
    // Buscar la nómina por UUID
    const nomina = await Nomina.findOne({
      where: { uuid: req.params.id },
    });

    if (!nomina) {
      // Si no se encuentra la nómina, terminamos con la respuesta
      return res.status(404).json({ msg: "Nómina no encontrada" });
    }

    const {
      honoquincena,
      honodia,
      totaldiasliquidar,
      clasesapoyosena,
      valorclaseapoyosena,
      diasdominicales,
      valordiadominical,
      clasesintructor,
      valorclaseinstructor,
      totalinscripcionesliquidar,
      valorcomisioninscripcion,
      observaciones,
      totalpagar,
      deducciones,
      saldopendiente,
    } = req.body;

    // Validar si está dentro de los días permitidos para editar
    const diaActual = moment().date();
    const periodo = nomina.periodo;
    const diasPermitidos =
      periodo === 1 ? [1, 2, 3, 4, 5] : [15, 16, 17, 18, 19];

    if (!diasPermitidos.includes(diaActual)) {
      // Si no está dentro de los días permitidos, retornamos
      return res.status(400).json({
        msg: `Solo puedes editar la nómina durante los días del periodo ${periodo}.`,
      });
    }

    // Actualizar la nómina en la base de datos
    await Nomina.update(
      {
        honoquincena,
        honodia,
        totaldiasliquidar,
        clasesapoyosena,
        valorclaseapoyosena,
        diasdominicales,
        valordiadominical,
        clasesintructor,
        valorclaseinstructor,
        totalinscripcionesliquidar,
        valorcomisioninscripcion,
        observaciones,
        totalpagar,
        deducciones,
        saldopendiente,
      },
      { where: { uuid: req.params.id } }
    );
    return res.status(200).json({ msg: "¡Nómina actualizada con éxito!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error en el servidor: " + error.message });
  }
};

//Función para eliminar una nómina
export const deleteNomina = async (req, res) => {
  const nomina = await Nomina.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!nomina) {
    return res.status(404).json({ msg: "Nómina no encontrada" });
  }
  try {
    await Nomina.destroy({
      where: {
        id: nomina.id,
      },
    });
    res.status(200).json({ msg: "¡Nómina eliminada con éxito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
