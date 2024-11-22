import express from "express";

import {
  getAdministradores,
  getAdministradorById,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from "../controllers/Administradores.js";
import {
  verifyAdministrador,
  administradorOnly,
} from "../middleware/AutenticacionAdministrador.js";
const router = express.Router();

router.get(
  "/administradores",
  verifyAdministrador,
  administradorOnly,
  getAdministradores
);
router.get(
  "/administradores/:id",
  verifyAdministrador,
  administradorOnly,
  getAdministradorById
);
router.post("/administradores",  createAdministrador);
router.patch(
  "/administradores/:id",
  verifyAdministrador,
  administradorOnly,
  updateAdministrador
);
router.delete(
  "/administradores/:id",
  verifyAdministrador,
  administradorOnly,
  deleteAdministrador
);

export default router;
