import Coordinador from "../models/CoordinadorModel.js";

export const verifyCoordinador = async (req, res, next) => {
  if (!req.session.coordinadorId) {
    return res.status(401).json({ msg: "¡Inicie sesión en su cuenta como Coordinador!" });
  }
  const coordinador = await Coordinador.findOne({
    where: {
      uuid: req.session.coordinadorId,
    },
  });
  if (!coordinador)
    return res.status(404).json({ msg: "No se ha encontrado al usuario." });
  req.coordinadorId = coordinador.id;
  req.role = coordinador.role;
  next();
};

export const coordinadorOnly = async (req, res, next) => {
  const coordinador = await Coordinador.findOne({
    where: {
      uuid: req.session.coordinadorId,
    },
  });
  if (!coordinador)
    return res.status(404).json({ msg: "No se ha encontrado al usuario." });
  if (coordinador.role !== "Coordinador")
    return res.status(403).json({
      msg: "Acceso denegado, no tienes permiso para realizar esta acción.",
    });

  next();
};
