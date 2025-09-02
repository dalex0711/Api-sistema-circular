import { Router } from "express";
import { EvaluacionController } from "../controllers/evaluacion.controller.js";

const router = Router();

// Crear evaluación
router.post("/evaluaciones", EvaluacionController.crearEvaluacion);

// Listar todas las evaluaciones
router.get("/evaluaciones", EvaluacionController.listarEvaluaciones);

// Listar evaluaciones por usuario
router.get("/evaluaciones/usuario/:usuarioId", EvaluacionController.listarPorUsuario);

// Filtrar evaluaciones por diagnóstico
router.get("/evaluaciones/diagnostico/:id", EvaluacionController.filtrarPorDiagnostico);

export default router;
