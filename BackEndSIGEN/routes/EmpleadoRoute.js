import express from "express";

import {
  getEmpleados,
  getEmpleadosById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/Empleados.js";

const router = express.Router();

router.get("/empleado", getEmpleados);
router.get("/empleado/:id", getEmpleadosById);
router.post("/empleado", createEmpleado);
router.patch("/empleado/:id", updateEmpleado);
router.delete("/empleado/:id", deleteEmpleado);

export default router;
