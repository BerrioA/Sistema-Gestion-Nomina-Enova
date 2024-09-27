import Nomina from "../models/NominaModel.js";
import Empleado from "../models/EmpleadoModel.js"; // Asegúrate que este modelo esté correctamente configurado

//Función para mostrar todas las nóminas
export const getNominas = async (req, res) => {
  try {
    const response = await Nomina.findAll({
      attributes: [
        "uuid",
        "honoquincena",
        "honodia",
        "totaldiasliquidar",
        "clasesapoyosena",
        "diasdominical",
        "clasesintructores",
        "totalinscripcionesliquidar",
        "honoperiodoliquidacion",
        "valortotaldominicales",
        "valortotalclasesinstructores",
        "comicioninscripcionestudiante",
        "totalpagar",
        "pagosadicionalespendientes",
        "saldopendiente",
        "observaciones",
        "empleadoId",
      ],
      include: [
        {
          model: Empleado,
          attributes: ["nombre", "apellido"], // Si necesitas los datos del empleado
        },
      ],
    });
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
        "diasdominical",
        "clasesintructores",
        "totalinscripcionesliquidar",
        "honoperiodoliquidacion",
        "valortotaldominicales",
        "valortotalclasesinstructores",
        "comicioninscripcionestudiante",
        "totalpagar",
        "pagosadicionalespendientes",
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

//Función para crear o registrar una nómina
export const createNomina = async (req, res) => {
  const {
    honoquincena,
    honodia,
    totaldiasliquidar,
    clasesapoyosena,
    diasdominical,
    clasesintructores,
    totalinscripcionesliquidar,
    honoperiodoliquidacion,
    valortotaldominicales,
    valortotalclasesinstructores,
    comicioninscripcionestudiante,
    totalpagar,
    pagosadicionalespendientes,
    saldopendiente,
    observaciones,
    empleadoId,
  } = req.body;

  try {
    await Nomina.create({
      honoquincena,
      honodia,
      totaldiasliquidar,
      clasesapoyosena,
      diasdominical,
      clasesintructores,
      totalinscripcionesliquidar,
      honoperiodoliquidacion,
      valortotaldominicales,
      valortotalclasesinstructores,
      comicioninscripcionestudiante,
      totalpagar,
      pagosadicionalespendientes,
      saldopendiente,
      observaciones,
      empleadoId,
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
    diasdominical,
    clasesintructores,
    totalinscripcionesliquidar,
    honoperiodoliquidacion,
    valortotaldominicales,
    valortotalclasesinstructores,
    comicioninscripcionestudiante,
    totalpagar,
    pagosadicionalespendientes,
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
        diasdominical,
        clasesintructores,
        totalinscripcionesliquidar,
        honoperiodoliquidacion,
        valortotaldominicales,
        valortotalclasesinstructores,
        comicioninscripcionestudiante,
        totalpagar,
        pagosadicionalespendientes,
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
