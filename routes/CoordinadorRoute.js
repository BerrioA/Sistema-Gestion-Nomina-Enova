import express from "express";

import {
  getCoordinadores,
  getCoordinadorById,
  createCoordinador,
  updateCoordinador,
  deleteCoordinador,
} from "../controllers/Coordinadores.js";
import {
  administradorOnly,
  verifyAdministrador,
} from "../middleware/AutenticacionAdministrador.js";
const router = express.Router();

router.get(
  "/coordinadores",
  verifyAdministrador,
  administradorOnly,
  getCoordinadores
);
router.get(
  "/coordinadores/:id",
  verifyAdministrador,
  administradorOnly,
  getCoordinadorById
);
router.post(
  "/coordinadores",
  verifyAdministrador,
  administradorOnly,
  createCoordinador
);
router.patch(
  "/coordinadores/:id",
  updateCoordinador
);
router.delete(
  "/coordinadores/:id",
  verifyAdministrador,
  administradorOnly,
  deleteCoordinador
);

export default router;
