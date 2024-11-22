import Administrador from "../models/AdminModel.js";

export const verifyAdministrador = async (req, res, next) => {
  try {
    if (!req.session.administradorId) {
      return res.status(401).json({ msg: "¡Inicie sesión en su cuenta!" });
    }
    const administrador = await Administrador.findOne({
      where: {
        uuid: req.session.administradorId,
      },
    });
    if (!administrador) {
      return res.status(404).json({ msg: "No se ha encontrado al usuario." });
    }
    req.administradorId = administrador.id;
    req.rol = administrador.rol;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

export const administradorOnly = async (req, res, next) => {
  const administrador = await Administrador.findOne({
    where: {
      uuid: req.session.administradorId,
    },
  });
  if (!administrador)
    return res.status(404).json({ msg: "No se ha encontrado al usuario." });
  if (administrador.rol !== "Administrador")
    return res.status(403).json({
      msg: "Acceso denegado, no tienes permiso para realizar esta acción.",
    });

  next();
};
