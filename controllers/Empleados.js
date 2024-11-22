import Empleado from "../models/EmpleadoModel.js";
import Coordinador from "../models/CoordinadorModel.js";
import Nomina from "../models/NominaModel.js";
import { Op } from "sequelize";

export const getEmpleados = async (req, res) => {
  try {
    let response;

    // Si es un administrador, se recuperan todos los empleados
    if (req.rol === "Administrador") {
      response = await Empleado.findAll({
        attributes: [
          "id",
          "uuid",
          "sede",
          "cargo",
          "nombre",
          "apellido",
          "cc",
          "banco",
          "numcuenta",
          "honomensual",
        ],
        include: [
          { model: Nomina, attributes: ["uuid"] },
          {
            model: Coordinador,
            attributes: ["nombre", "correo"],
          },
        ],
      });
    } else if (req.rol === "Coordinador") {
      // Si es un coordinador, solo se recuperan los empleados vinculados
      response = await Empleado.findAll({
        attributes: [
          "id",
          "uuid",
          "sede",
          "cargo",
          "nombre",
          "apellido",
          "cc",
          "banco",
          "numcuenta",
          "honomensual",
        ],
        where: {
          coordinadorId: req.coordinadorId,
        },
        include: [
          { model: Nomina, attributes: ["uuid"] },
          {
            model: Coordinador,
            attributes: ["nombre", "correo"],
          },
        ],
      });
    } else {
      return res.status(403).json({ msg: "Acceso denegado." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    // Buscar empleado por uuid
    const empleado = await Empleado.findOne({
      where: {
        uuid: req.params.id, // Buscar por UUID
      },
    });

    if (!empleado)
      return res
        .status(404)
        .json({ msg: "Datos del empleado no encontrados." });

    let response;

    // Si el rol es "Coordinador"
    if (req.rol === "Coordinador") {
      response = await Empleado.findOne({
        attributes: [
          "id", // Incluir id
          "uuid",
          "sede",
          "cargo",
          "nombre",
          "apellido",
          "cc",
          "banco",
          "numcuenta",
          "honomensual",
        ],
        where: {
          id: empleado.id, // Buscar por id
        },
        include: [
          { model: Nomina, attributes: ["uuid"] },
          {
            model: Coordinador,
            attributes: ["nombre", "correo"],
          },
        ],
      });
    } else {
      // Si el rol no es "Coordinador"
      response = await Empleado.findOne({
        attributes: [
          "id", // Incluir id aquí también
          "uuid",
          "sede",
          "cargo",
          "nombre",
          "apellido",
          "cc",
          "banco",
          "numcuenta",
          "honomensual",
        ],
        where: {
          [Op.and]: [{ id: empleado.id }, { coordinadorId: req.coordinadorId }],
        },
        include: [
          {
            model: Coordinador,
            attributes: ["nombre", "correo"],
          },
        ],
      });
    }

    // Enviar respuesta
    res.status(200).json(response);
  } catch (error) {
    // Enviar mensaje de error
    res.status(500).json({ msg: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  const { sede, cargo, nombre, apellido, cc, banco, numcuenta, honomensual } =
    req.body;
  try {
    await Empleado.create({
      sede: sede,
      cargo: cargo,
      nombre: nombre,
      apellido: apellido,
      cc: cc,
      banco: banco,
      numcuenta: numcuenta,
      honomensual: honomensual,
      coordinadorId: req.coordinadorId,
    });
    res.status(202).json({ msg: "Empleado Registrado con Exito!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!empleado)
      return res
        .status(404)
        .json({ msg: "Datos del empleados no encontrados." });
    const { sede, cargo, nombre, apellido, cc, banco, numcuenta, honomensual } =
      req.body;
    if (req.role === "Administrador") {
      await Empleado.update(
        {
          sede,
          cargo,
          nombre,
          apellido,
          cc,
          banco,
          numcuenta,
          honomensual,
        },
        {
          where: {
            id: empleado.id,
          },
        }
      );
    } else {
      if (req.coordinadorId !== empleado.coordinadorId)
        return res.status(403).json({ msg: "Acceso restringido!" });
      await Empleado.update(
        {
          sede,
          cargo,
          nombre,
          apellido,
          cc,
          banco,
          numcuenta,
          honomensual,
        },
        {
          where: {
            [Op.and]: [
              { id: empleado.id },
              { coordinadorId: req.coordinadorId },
            ],
          },
        }
      );
    }
    res.status(200).json({ msg: "Empleado Actualizado con Exito!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!empleado) return res.status(404).json({ msg: "Datos no encontrados" });
    const { sede, cargo, nombre, apellido, cc, banco, numcuenta, honomensual } =
      req.body;
    if (req.rol === "Coordinador") {
      await Empleado.destroy({
        where: {
          id: empleado.id,
        },
      });
    } else {
      if (req.coordinadorId !== empleado.coordinadorId)
        return res.status(403).json({
          msg: "Acceso denegado, no tienes permisos para realizar esta acción.",
        });
      await Empleado.destroy({
        where: {
          [Op.and]: [{ id: empleado.id }, { empleadoId: req.coordinadorId }],
        },
      });
    }
    res.status(200).json({
      msg: "Empleado Eliminado con Exito!",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
