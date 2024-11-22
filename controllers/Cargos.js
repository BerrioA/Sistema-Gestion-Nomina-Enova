import Cargos from "../models/CargoModel.js";

//Función encargada de Mostrar todos los cargos.
export const getCargos = async (req, res) => {
  try {
    const response = await Cargos.findAll({
      attributes: ["uuid", "nombrecargo"],
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

//Función encargada de Mostrar un cargo por ID.
export const getCargoById = async (req, res) => {
  try {
    const response = await Cargos.findOne({
      attributes: ["uuid", "nombrecargo"],
      where: {
        uuid: req.params.id,
      },
    });

    if (!response) {
      return res
        .status(404)
        .json({ msg: "Cargo no encontrado con el ID proporcionado." });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener el cargo:", error);
    res.status(500).json({
      msg: "Hubo un problema al intentar obtener el cargo. Por favor, intenta nuevamente más tarde.",
      error: error.message,
    });
  }
};
