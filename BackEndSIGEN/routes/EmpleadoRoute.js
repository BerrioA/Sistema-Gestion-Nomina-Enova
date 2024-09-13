import express from "express";

import {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/Empleados.js";

const router = express.Router();

router.get("/empleados", getEmpleados);
router.get("/empleados/:id", getEmpleadoById);
router.post("/empleados", createEmpleado);
router.patch("/empleados/:id", updateEmpleado);
router.delete("/empleados/:id", deleteEmpleado);

export default router;
