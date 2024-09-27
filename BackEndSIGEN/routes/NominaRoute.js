import express from "express";

import {
  getNominas,
  getNominaById,
  createNomina,
  updateNomina,
  deleteNomina,
} from "../controllers/Nomina.js";

import {
  coordinadorOnly,
  verifyCoordinador,
} from "../middleware/AutenticacionCoordinador.js";

import {
  administradorOnly,
  verifyAdministrador,
} from "../middleware/AutenticacionAdministrador.js";

const router = express.Router();

// Administradores y coordinadores pueden ver las nóminas
router.get("/nominas",verifyAdministrador, getNominas);
router.get(
  "/nominas/:id",
  [verifyCoordinador, verifyAdministrador],
  getNominaById
);

// Solo coordinadores pueden crear, actualizar o eliminar nóminas
router.post("/nominas", verifyCoordinador, coordinadorOnly, createNomina);
router.patch("/nominas/:id", verifyCoordinador, coordinadorOnly, updateNomina);
router.delete("/nominas/:id", verifyCoordinador, coordinadorOnly, deleteNomina);

export default router;
