import { pool } from "../config/db.js";

export class EvaluacionModel {
  static async crear(usuarioId, diagnosticoId) {
    const [result] = await pool.query(
      "INSERT INTO evaluaciones (usuario_id, diagnostico_id) VALUES (?, ?)",
      [usuarioId, diagnosticoId]
    );
    return result.insertId;
  }

  static async guardarRespuestas(evaluacionId, respuestas) {
    const values = respuestas.map(r => [evaluacionId, r.preguntaId, r.respuestaId]);
    await pool.query(
      "INSERT INTO respuestas (evaluacion_id, pregunta_id, respuesta_id) VALUES ?",
      [values]
    );
  }

  static async listar() {
    const [rows] = await pool.query(
      `SELECT e.id, e.usuario_id, e.fecha_evaluacion,
              d.descripcion AS diagnostico, d.nivel_riesgo
       FROM evaluaciones e
       JOIN diagnosticos_catalogo d ON e.diagnostico_id = d.id
       ORDER BY e.fecha_evaluacion DESC`
    );
    return rows;
  }

  static async listarPorUsuario(usuarioId) {
    const [rows] = await pool.query(
      `SELECT e.id, e.usuario_id, e.fecha_evaluacion,
              d.descripcion AS diagnostico, d.nivel_riesgo
       FROM evaluaciones e
       JOIN diagnosticos_catalogo d ON e.diagnostico_id = d.id
       WHERE e.usuario_id = ?
       ORDER BY e.fecha_evaluacion DESC`,
      [usuarioId]
    );
    return rows;
  }

  static async filtrarPorDiagnostico(diagnosticoId) {
    const [rows] = await pool.query(
      `SELECT e.id, e.usuario_id, e.fecha_evaluacion,
              d.descripcion AS diagnostico, d.nivel_riesgo
       FROM evaluaciones e
       JOIN diagnosticos_catalogo d ON e.diagnostico_id = d.id
       WHERE e.diagnostico_id = ?`,
      [diagnosticoId]
    );
    return rows;
  }
}
