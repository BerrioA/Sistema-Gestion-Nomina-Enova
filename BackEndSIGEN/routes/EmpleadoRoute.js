import express from "express";

import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/Empleados.js";
import {
  coordinadorOnly,
  verifyCoordinador,
} from "../middleware/AutenticacionCoordinador.js";
import { verifyAdministrador } from "../middleware/AutenticacionAdministrador.js";
const router = express.Router();

router.get(
  "/empleados",
  verifyCoordinador,
  getEmpleados
);

router.get("/empleados/:id", verifyCoordinador, getEmpleadoById);
router.post("/empleados", verifyCoordinador, coordinadorOnly, createEmpleado);
router.patch(
  "/empleados/:id",
  verifyCoordinador,
  coordinadorOnly,
  updateEmpleado
);
router.delete(
  "/empleados/:id",
  verifyCoordinador,
  coordinadorOnly,
  deleteEmpleado
);

export default router;
