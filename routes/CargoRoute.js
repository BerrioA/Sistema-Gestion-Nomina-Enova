import express from "express";

import { getCargos, getCargoById } from "../controllers/Cargos.js";

const router = express.Router();

router.get("/cargos", getCargos);
router.get("/cargos/:id", getCargoById);

export default router;
