import Coordinador from "../models/CoordinadorModel.js";

export const verifyCoordinador = async (req, res, next) => {
  try {
    if (!req.session.coordinadorId) {
      return res
        .status(401)
        .json({ msg: "¡Inicie sesión en su cuenta como Coordinador!" });
    }
    const coordinador = await Coordinador.findOne({
      where: {
        uuid: req.session.coordinadorId,
      },
    });
    if (!coordinador) {
      return res.status(404).json({ msg: "No se ha encontrado al usuario." });
    }
    req.coordinadorId = coordinador.id;
    req.rol = coordinador.rol;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

export const coordinadorOnly = async (req, res, next) => {
  try {
    await verifyCoordinador(req, res, next); // Llama al middleware de verificación
    const coordinador = await Coordinador.findOne({
      where: {
        uuid: req.session.coordinadorId,
      },
    });
    if (coordinador.rol !== "Coordinador") {
      return res.status(403).json({
        msg: "Acceso denegado, no tienes permiso para realizar esta acción.",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
