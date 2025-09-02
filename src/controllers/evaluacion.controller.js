import { EvaluacionModel } from "../models/evaluacion.js";
import { RulesService } from "../services/rules.service.js";

export class EvaluacionController {
  static async crearEvaluacion(req, res) {
    try {
      const { usuarioId, respuestas } = req.body;

      if (!usuarioId || !respuestas || respuestas.length === 0) {
        return res.status(400).json({ ok: false, error: "usuarioId y respuestas son requeridos" });
      }

      // Calcular diagnóstico
      const diagnosticoId = await RulesService.calcularDiagnostico(respuestas);

      // Guardar evaluación
      const evaluacionId = await EvaluacionModel.crear(usuarioId, diagnosticoId);

      // Guardar respuestas
      await EvaluacionModel.guardarRespuestas(evaluacionId, respuestas);

      return res.json({ ok: true, evaluacionId, diagnosticoId });
    } catch (error) {
      console.error("Error en crearEvaluacion:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  static async listarEvaluaciones(req, res) {
    try {
      const evaluaciones = await EvaluacionModel.listar();
      return res.json(evaluaciones);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  static async listarPorUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const evaluaciones = await EvaluacionModel.listarPorUsuario(usuarioId);
      return res.json(evaluaciones);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  static async filtrarPorDiagnostico(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ ok: false, error: "diagnosticoId es requerido" });
      }

      const evaluaciones = await EvaluacionModel.filtrarPorDiagnostico(id);

      if (evaluaciones.length === 0) {
        return res.json({ ok: true, data: [], message: "No hay evaluaciones para este diagnóstico" });
      }

      return res.json({ ok: true, data: evaluaciones });
    } catch (error) {
      console.error("Error en filtrarPorDiagnostico:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }
}
