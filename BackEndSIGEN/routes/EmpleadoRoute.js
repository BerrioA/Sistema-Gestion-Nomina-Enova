import express from "express";

import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/Empleados.js";
import { verifyAdministrador } from "../middleware/AutenticacionAdministrador.js";
const router = express.Router();

router.get("/empleados", verifyAdministrador, getEmpleados);
router.get("/empleados/:id", verifyAdministrador, getEmpleadoById);
router.post("/empleados", verifyAdministrador, createEmpleado);
router.patch("/empleados/:id", verifyAdministrador, updateEmpleado);
router.delete("/empleados/:id", verifyAdministrador, deleteEmpleado);

export default router;
