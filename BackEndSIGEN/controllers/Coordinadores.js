import Coordinador from "../models/CoordinadorModel.js";
import argon2 from "argon2";

//Función encargada de Mostrar todos los administradores.
export const getCoordinadores = async (req, res) => {
  try {
    const response = await Coordinador.findAll({
      attributes: [
        "uuid",
        "nombre",
        "apellido",
        "sede",
        "cargo",
        "correo",
        "rol",
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
        "nombre",
        "apellido",
        "sede",
        "cargo",
        "correo",
        "rol",
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

// Función encargada de Crear o Registrar un Administrador.
export const createCoordinador = async (req, res) => {
  const { nombre, apellido, correo, cargo, sede, password, confPassword, rol } =
    req.body;

  if (password === "" || password === null) {
    return res.status(404).json({
      msg: "No ha ingresado una contraseña, por favor verifique y vuelva a intentar.",
    });
  }
  if (password !== confPassword) {
    return res.status(400).json({
      msg: "Las contraseñas no coinciden, por favor verifique y vuelva a intentar.",
    });
  }
  const hashPassword = await argon2.hash(password); // Hash de la contraseña
  try {
    // Crear el coordinador con el id del administrador
    await Coordinador.create({
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      sede: sede,
      cargo: cargo,
      password: hashPassword,
      rol: rol,
      administradorId: req.administradorId, // Asegúrate de que esto esté correctamente asignado
    });
    res.status(201).json({ msg: "¡Usuario registrado con éxito!" });
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Manejo de errores
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

  const { nombre, apellido, correo, cargo, password, confPassword, rol } =
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
        nombre: nombre,
        correo: correo,
        apellido: apellido,
        password: hashPassword,
        rol: rol,
        cargo: cargo,
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
