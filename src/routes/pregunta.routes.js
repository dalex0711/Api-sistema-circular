import { Router } from "express";
import { PreguntaController } from "../controllers/pregunta.controller.js";

const router = Router();

router.get("/preguntas", PreguntaController.listarPreguntas);

export default router;
