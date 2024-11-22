import express from "express";

import {
  getNominas,
  getNominaById,
  createNomina,
  updateNomina,
  deleteNomina,
} from "../controllers/Nomina.js";

import { verifyCoordinador } from "../middleware/AutenticacionCoordinador.js";

import { verifyTypeUser } from "../middleware/VerifyTypeUser.js";

const router = express.Router();

// Administradores y coordinadores pueden ver las nóminas
router.get("/nominas", verifyTypeUser, getNominas);
router.get("/nominas/:id", verifyCoordinador, getNominaById);

// Solo coordinadores pueden crear, actualizar o eliminar nóminas
router.post("/nominas", verifyCoordinador, createNomina);
router.patch("/nominas/:id", verifyCoordinador, updateNomina);
router.delete("/nominas/:id", verifyCoordinador, deleteNomina);

export default router;
