import Administrador from "../models/AdminModel.js";
import argon2 from "argon2";

//Función encargada de Mostrar todos los administradores.
export const getAdministradores = async (req, res) => {
  try {
    const response = await Administrador.findAll({
      attributes: ["uuid", "nombre", "apellido", "correo", "rol"],
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
      attributes: ["uuid", "nombre", "apellido", "correo", "rol"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Función encargada de Crear o Registrar un Administrador.
export const createAdministrador = async (req, res) => {
  const { nombre, apellido, correo, password, confPassword, rol } = req.body;
  if (password === "" || password === null)
    return res.status(404).json({
      msg: "No ha ingresado una contraseña, por favor verifique y vuelva a intentar.",
    });
  if (password !== confPassword)
    return res.status(400).json({
      msg: "Contraseñas no coincide, por favor verifique y vuelva a intentar.",
    });
  const hashPassword = await argon2.hash(password);
  try {
    await Administrador.create({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      password: hashPassword,
      rol: rol,
    });
    res.status(201).json({ msg: "¡Usuario registrado con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Función encargada de Actualizar un Administrador.
export const updateAdministrador = async (req, res) => {
  const administrador = await Administrador.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!administrador) {
    return res
      .status(404)
      .json({ msg: "No tiene acceso para realizar esta acción." });
  }

  const { nombre, apellido, correo, password, confPassword, rol } = req.body;
  let hashPassword;

  if (!password || password === "") {
    hashPassword = administrador.password;
  } else {
    if (password !== confPassword) {
      return res.status(400).json({
        msg: "Las contraseñas no coinciden, por favor verifique y vuelva a intentar.",
      });
    }

    if (typeof password === "string" && password.length > 0) {
      hashPassword = await argon2.hash(password);
    } else {
      return res.status(400).json({
        msg: "La contraseña proporcionada no es válida.",
      });
    }
  }

  try {
    await Administrador.update(
      {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: hashPassword,
        rol: rol,
      },
      {
        where: {
          id: administrador.id,
        },
      }
    );
    return res.status(200).json({ msg: "¡Usuario Actualizado con éxito!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteAdministrador = async (req, res) => {
  const administrador = await Administrador.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!administrador)
    res.status(404).json({ msg: "No se encuentra el usuario." });
  try {
    await Administrador.destroy({
      where: {
        id: administrador.id,
      },
    });
    res.status(200).json({ msg: "¡Usuario Eliminado con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
