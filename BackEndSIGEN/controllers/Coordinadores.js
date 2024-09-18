import Coordinador from "../models/CoordinadorModel.js";
import argon2 from "argon2";

//Función encargada de Mostrar todos los administradores.
export const getCoordinadores = async (req, res) => {
  try {
    const response = await Coordinador.findAll({
      attributes: [
        "uuid",
        "name",
        "site",
        "charge",
        "lastname",
        "email",
        "role",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//Función encargada de Mostrar un administrador por ID.
export const getCoordinadorById = async (req, res) => {
  try {
    const response = await Coordinador.findOne({
      attributes: [
        "uuid",
        "name",
        "site",
        "charge",
        "lastname",
        "email",
        "role",
      ],
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
export const createCoordinador = async (req, res) => {
  const { name, lastname, email, charge, site, password, confPassword, role } =
    req.body;
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
    await Coordinador.create({
      name: name,
      lastname: lastname,
      email: email,
      site: site,
      charge: charge,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "¡Usuario registrado con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

//Función encargada de Actualizar un Administrador.
export const updateCoordinador = async (req, res) => {
  const coordinador = await Coordinador.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!coordinador) {
    return res
      .status(404)
      .json({ msg: "No tiene acceso para realizar esta acción." });
  }

  const { name, lastname, email, charge, password, confPassword, role } =
    req.body;
  let hashPassword;

  if (!password || password === "") {
    hashPassword = coordinador.password;
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
    await Coordinador.update(
      {
        name: name,
        email: email,
        lastname: lastname,
        password: hashPassword,
        role: role,
        charge: charge,
      },
      {
        where: {
          id: coordinador.id,
        },
      }
    );
    return res.status(200).json({ msg: "¡Usuario Actualizado con éxito!" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteCoordinador = async (req, res) => {
  const coordinador = await Coordinador.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!coordinador)
    res.status(404).json({ msg: "No se encuentra el usuario." });
  try {
    await Coordinador.destroy({
      where: {
        id: coordinador.id,
      },
    });
    res.status(200).json({ msg: "¡Usuario Eliminado con exito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
