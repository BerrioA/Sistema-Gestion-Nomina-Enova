import Coordinador from "../models/CoordinadorModel.js";
import Administrador from "../models/AdminModel.js";

export const verifyTypeUser = async (req, res, next) => {
  try {
    if (!req.session.administradorId && !req.session.coordinadorId) {
      return res.status(401).json({ msg: "¡Inicie sesión en su cuenta!" });
    }

    let usuario;
    if (req.session.administradorId) {
      usuario = await Administrador.findOne({
        where: { uuid: req.session.administradorId },
      });
      if (!usuario) {
        return res
          .status(404)
          .json({ msg: "No se ha encontrado al administrador." });
      }
      req.administradorId = usuario.id; // Guarda el id del administrador
      req.rol = usuario.rol; // Guarda el rol del administrador
      return next(); // Termina la verificación aquí para no seguir buscando
    }

    // Si hay un ID de coordinador en la sesión
    if (req.session.coordinadorId) {
      usuario = await Coordinador.findOne({
        where: { uuid: req.session.coordinadorId },
      });
      if (!usuario) {
        return res
          .status(404)
          .json({ msg: "No se ha encontrado al coordinador." });
      }
      req.coordinadorId = usuario.id; // Guarda el id del coordinador
      req.rol = usuario.rol; // Guarda el rol del coordinador
      return next(); // Termina la verificación aquí
    }

    // Si no se cumplen las condiciones, responde con un error
    return res.status(401).json({ msg: "¡Inicie sesión en su cuenta!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};
