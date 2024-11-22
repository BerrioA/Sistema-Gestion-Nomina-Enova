import express from "express";

import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/Empleados.js";
import {
  verifyCoordinador,
} from "../middleware/AutenticacionCoordinador.js";
import { verifyTypeUser } from "../middleware/VerifyTypeUser.js";
const router = express.Router();

router.get("/empleados", verifyTypeUser, getEmpleados);

router.get("/empleados/:id", verifyCoordinador, getEmpleadoById);
router.post("/empleados", verifyCoordinador, createEmpleado);
router.patch("/empleados/:id", verifyCoordinador, updateEmpleado);
router.delete(
  "/empleados/:id",
  verifyCoordinador,
  deleteEmpleado
);

export default router;
