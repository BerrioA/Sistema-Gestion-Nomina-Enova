import Empleado from "../models/EmpleadoModel.js";
import Coordinador from "../models/CoordinadorModel.js";
import { Op } from "sequelize";

export const getEmpleados = async (req, res) => {
  try {
    let response;
    if (req.role === "Coordinador") {
      response = await Empleado.findAll({
        attributes: [
          "uuid",
          "site",
          "charge",
          "name",
          "lastname",
          "nit",
          "bankname",
          "contnumber",
          "monthfees",
        ],
        include: [
          {
            model: Coordinador,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Empleado.findAll({
        attributes: [
          "uuid",
          "site",
          "charge",
          "name",
          "lastname",
          "nit",
          "bankname",
          "contnumber",
          "monthfees",
        ],
        where: {
          coordinadorId: req.coordinadorId,
        },
        include: [
          {
            model: Coordinador,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!empleado)
      return res
        .status(404)
        .json({ msg: "Datos del empleado no encontrados." });
    let response;
    if (req.role === "Coordinador") {
      response = await Empleado.findOne({
        attributes: [
          "uuid",
          "site",
          "charge",
          "name",
          "lastname",
          "nit",
          "bankname",
          "contnumber",
          "monthfees",
        ],
        where: {
          id: empleado.id,
        },
        include: [
          {
            model: Coordinador,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Empleado.findOne({
        attributes: [
          "uuid",
          "site",
          "charge",
          "name",
          "lastname",
          "nit",
          "bankname",
          "contnumber",
          "monthfees",
        ],
        where: {
          [Op.and]: [
            { id: empleado.id },
            { coordinadorId: req.coordinadorId },
          ],
        },
        include: [
          {
            model: Coordinador,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  const { site, charge, name, nit, lastname, bankname, contnumber, monthfees } =
    req.body;
  try {
    await Empleado.create({
      site: site,
      charge: charge,
      name: name,
      lastname: lastname,
      nit: nit,
      bankname: bankname,
      contnumber: contnumber,
      monthfees: monthfees,
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
    const {
      site,
      charge,
      name,
      lastname,
      nit,
      bankname,
      contnumber,
      monthfees,
    } = req.body;
    if (req.role === "Administrador") {
      await Empleado.update(
        {
          site,
          charge,
          name,
          lastname,
          nit,
          bankname,
          contnumber,
          monthfees,
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
          site,
          charge,
          name,
          lastname,
          nit,
          bankname,
          contnumber,
          monthfees,
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
    const {
      site,
      charge,
      name,
      lastname,
      nit,
      bankname,
      contnumber,
      monthfees,
    } = req.body;
    if (req.role === "Coordinador") {
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
          [Op.and]: [{ id: empleado.id }, { empleadoId: req.coordinadorIdId }],
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
