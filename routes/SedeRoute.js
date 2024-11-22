import express from "express";

import {
  getSedes,
  getSedeById,
  createSede,
  updateSede,
  deleteSede,
} from "../controllers/Sedes.js";
import {
  administradorOnly,
  verifyAdministrador,
} from "../middleware/AutenticacionAdministrador.js";
const router = express.Router();

router.get("/sedes", getSedes);
router.get("/sedes/:id", verifyAdministrador, administradorOnly, getSedeById);
router.post("/sedes", verifyAdministrador, administradorOnly, createSede);
router.patch("/sedes/:id", updateSede);
router.delete("/sedes/:id", verifyAdministrador, administradorOnly, deleteSede);

export default router;
