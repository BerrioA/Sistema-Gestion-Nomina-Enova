import Administrador from "../models/AdminModel.js";
import argon2 from "argon2";

//Función encargada de Mostrar todos los administradores.
export const getAdministradores = async (req, res) => {
  try {
    const response = await Administrador.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Función encargada de Mostrar un administrador por ID.
export const getAdministradorById = async (req, res) => {
  try {
    const response = await Administrador.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: res.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Función encargada de Crear o Registrar un Administrador.
export const createAdministrador = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password === "" || password === null)
    return res.status(404).json({
      msg: "No ha ingresado una contraseña, por favor verifique y vuelva a intentar.",
    });
  if (password !== confPassword)
    return res.status(400).json({
      msg: "Contraseña incorrecta, por favor verifique y vuelva a intentar.",
    });
  const hashPassword = await argon2.hash(password);
  try {
    await Administrador.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "¡Usuario registrado con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdministrador = async (req, res) => {};

export const deleteAdministrador = async (req, res) => {};
