import express from "express";

import {
  getAdministradores,
  getAdministradorById,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from "../controllers/Administradores.js";

const router = express.Router();

router.get("/administradores", getAdministradores);
router.get("/administradores/:id", getAdministradorById);
router.post("/administradores", createAdministrador);
router.patch("/administradores/:id", updateAdministrador);
router.delete("/administradores/:id", deleteAdministrador);

export default router;
