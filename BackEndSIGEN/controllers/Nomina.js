import Nomina from "../models/NominaModel.js";
import Empleado from "../models/EmpleadoModel.js";
import Coordinadores from "../models/CoordinadorModel.js";

//Función para mostrar todas las nóminas
export const getNominas = async (req, res) => {
  try {
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
          "valortotalclasesinstructor",
          "valortotalclasesapoyosena",
          "valorcomisioninscripcion",
          "honoperiodoliquidacion",
          "valortotaldominicales",
          "valortotalclasesinstructor",
          "comicioninscripcionestudiante",
          "totalpagar",
          "pagosadicionalespendientes",
          "deducciones",
          "saldopendiente",
          "observaciones",
          "empleadoId",
        ],
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
          "valortotalclasesapoyosena",
          "valorcomisioninscripcion",
          "honoperiodoliquidacion",
          "valortotaldominicales",
          "valortotalclasesinstructor",
          "comicioninscripcionestudiante",
          "totalpagar",
          "pagosadicionalespendientes",
          "deducciones",
          "saldopendiente",
          "observaciones",
          "empleadoId",
        ],
        where: {
          coordinadorId: req.coordinadorId,
        },
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

//Función para mostrar una nómina por ID (uuid)
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
        "valortotalclasesapoyosena",
        "totalinscripcionesliquidar",
        "valorcomisioninscripcion",
        "honoperiodoliquidacion",
        "valortotaldominicales",
        "valortotalclasesinstructor",
        "comicioninscripcionestudiante",
        "totalpagar",
        "pagosadicionalespendientes",
        "deducciones",
        "saldopendiente",
        "observaciones",
        "empleadoId",
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
    valortotalclasesapoyosena,
    honoperiodoliquidacion,
    valortotaldominicales,
    valortotalclasesinstructor,
    comicioninscripcionestudiante,
    totalpagar,
    pagosadicionalespendientes,
    deducciones,
    saldopendiente,
    observaciones,
    empleadoId,
    sede: sede,
  } = req.body;

  try {
    // Verificar si el empleado existe en la tabla empleado
    const empleado = await Empleado.findOne({ where: { id: empleadoId } });

    if (!empleado) {
      return res.status(404).json({ msg: "El empleado no existe." });
    }

    await Nomina.create({
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
      valortotalclasesapoyosena,
      honoperiodoliquidacion,
      valortotaldominicales,
      valortotalclasesinstructor,
      comicioninscripcionestudiante,
      totalpagar,
      pagosadicionalespendientes,
      deducciones,
      saldopendiente,
      observaciones,
      empleadoId,
      coordinadorId: req.coordinadorId,
      sede: sede,
    });

    res.status(201).json({ msg: "¡Nómina registrada con éxito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Función para actualizar una nómina
export const updateNomina = async (req, res) => {
  const nomina = await Nomina.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!nomina) {
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
    valortotalclasesapoyosena,
    honoperiodoliquidacion,
    valortotaldominicales,
    valortotalclasesinstructor,
    comicioninscripcionestudiante,
    totalpagar,
    pagosadicionalespendientes,
    deducciones,
    saldopendiente,
    observaciones,
    empleadoId,
  } = req.body;

  try {
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
        valortotalclasesapoyosena,
        honoperiodoliquidacion,
        valortotaldominicales,
        valortotalclasesinstructor,
        comicioninscripcionestudiante,
        totalpagar,
        pagosadicionalespendientes,
        deducciones,
        saldopendiente,
        observaciones,
        empleadoId,
      },
      {
        where: {
          id: nomina.id,
        },
      }
    );
    return res.status(200).json({ msg: "¡Nómina actualizada con éxito!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
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
