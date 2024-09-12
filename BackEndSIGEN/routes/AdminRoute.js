import express from "express";

import {
  getAdministradores,
  getAdministradorById,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from "../controllers/Administradores.js";

const router = express.Router();

router.get("/administrador", getAdministradores);
router.get("/administrador/:id", getAdministradorById);
router.post("/administrador", createAdministrador);
router.patch("/administrador/:id", updateAdministrador);
router.delete("/administrador/:id", deleteAdministrador);

export default router;
