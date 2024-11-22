import Sedes from "../models/SedeModel.js";

//Función encargada de Mostrar todos las sedes.
export const getSedes = async (req, res) => {
  try {
    const response = await Sedes.findAll({
      attributes: ["uuid", "nombresede"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener las sedes:", error);
    res.status(500).json({
      msg: "Ocurrió un error al intentar obtener la lista de sedes. Por favor, intenta nuevamente más tarde.",
      error: error.message,
    });
  }
};

//Función encargada de Mostrar un administrador por ID.
export const getSedeById = async (req, res) => {
  try {
    const response = await Sedes.findOne({
      attributes: ["uuid", "nombresede"],
      where: {
        uuid: req.params.id,
      },
    });

    if (!response) {
      return res
        .status(404)
        .json({ msg: "Sede no encontrada con el ID proporcionado." });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener la sede:", error);
    res.status(500).json({
      msg: "Hubo un problema al intentar obtener la sede. Por favor, intenta nuevamente más tarde.",
      error: error.message,
    });
  }
};

// Función encargada de Crear o Registrar un Administrador.
export const createSede = async (req, res) => {
  const { nombresede } = req.body;
  try {
    if (!nombresede || nombresede.trim() === "") {
      return res
        .status(400)
        .json({ msg: "El nombre de la sede es requerido." });
    }
    await Sedes.create({
      nombresede: nombresede.trim(),
      administradorId: req.administradorId,
    });
    res.status(201).json({ msg: "¡Sede guardada con éxito!" });
  } catch (error) {
    console.error("Error al crear la sede:", error);
    res.status(500).json({
      msg: "Hubo un problema al intentar guardar la sede. Por favor, intenta nuevamente más tarde.",
      error: error.message,
    });
  }
};


//Función encargada de Actualizar un Administrador.
export const updateSede = async (req, res) => {
  const sede = await Sedes.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!sede) {
    return res
      .status(404)
      .json({ msg: "No tiene acceso para realizar esta acción." });
  }

  const { nombresede } =
    req.body;

  try {
    await Sedes.update(
      {
        nombresede: nombresede,
      },
      {
        where: {
          id: sede.id,
        },
      }
    );
    return res.status(200).json({ msg: "¡Sede Actualizada con éxito!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteSede = async (req, res) => {
  const sede = await Sedes.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!sede)
    res.status(404).json({ msg: "No se encuentra la Sede." });
  try {
    await Sedes.destroy({
      where: {
        id: sede.id,
      },
    });
    res.status(200).json({ msg: "¡Sede Eliminada con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
