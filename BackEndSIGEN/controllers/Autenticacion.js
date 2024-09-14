import Administrador from "../models/AdminModel.js";
import argon2 from "argon2";

//Función encargada de iniciar sesión.
export const Login = async (req, res) => {
  const administrador = await Administrador.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!administrador)
    return res.status(404).json({ msg: "Usuario no encontrado." });
  const match = await argon2.verify(administrador.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Contraseña incorrecta." });
  req.session.administradorId = administrador.uuid;
  const uuid = administrador.uuid;
  const name = administrador.name;
  const email = administrador.email;
  const role = administrador.role;
  res.status(200).json({ uuid, name, email, role });
};

//Función encargada de manejar si esta dentro de la sesión.
export const Me = async (req, res) => {
  if (!req.session.administradorId) {
    return res.status(401).json({ msg: "¡Inicie sesión en su cuenta!" });
  }
  const administrador = await Administrador.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.administradorId,
    },
  });
  if (!administrador)
    return res.status(404).json({ msg: "No se ha encontrado al usuario." });
  res.status(200).json(administrador);
};

//Función encargada de cerrar sesión.
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "No se puede cerrar sesión." });
    res.status(200).json({ msg: "Te has desconectado." });
  });
};
