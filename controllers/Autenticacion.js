import Administrador from "../models/AdminModel.js";
import Coordinador from "../models/CoordinadorModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    let user = await Administrador.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if (!user) {
      user = await Coordinador.findOne({
        where: {
          correo: req.body.correo,
        },
      });

      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado." });
      }
    }

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Contraseña incorrecta." });

    // Manejo de sesiones: si es administrador o coordinador
    if (user instanceof Administrador) {
      req.session.administradorId = user.uuid;
    } else if (user instanceof Coordinador) {
      req.session.coordinadorId = user.uuid;
    }

    // Devolver la información del usuario
    const { uuid, nombre, apellido, correo, rol } = user;
    res.status(200).json({ uuid, nombre, apellido, correo, rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Función encargada de manejar si está dentro de la sesión.
export const Me = async (req, res) => {
  try {
    // Verificar si el usuario está logueado como administrador
    if (req.session.administradorId) {
      const administrador = await Administrador.findOne({
        attributes: ["uuid", "nombre", "apellido", "correo", "rol"],
        where: {
          uuid: req.session.administradorId,
        },
      });

      if (!administrador)
        return res.status(404).json({ msg: "Administrador no encontrado." });
      return res.status(200).json(administrador);
    }

    // Verificar si el usuario está logueado como coordinador
    if (req.session.coordinadorId) {
      const coordinador = await Coordinador.findOne({
        attributes: ["uuid", "nombre", "apellido", "correo", "rol"],
        where: {
          uuid: req.session.coordinadorId,
        },
      });

      if (!coordinador)
        return res.status(404).json({ msg: "Coordinador no encontrado." });
      return res.status(200).json(coordinador);
    }

    // Si no hay sesión, devolver un error
    return res.status(401).json({ msg: "¡Inicie sesión en su cuenta!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error en el servidor." });
  }
};

// Función encargada de cerrar sesión.
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "No se puede cerrar sesión." });
    res.status(200).json({ msg: "Te has desconectado." });
  });
};
