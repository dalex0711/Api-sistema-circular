import { pool } from "../config/db.js";

export class PreguntaModel {
  static async obtenerPreguntas() {
    const [rows] = await pool.query("SELECT * FROM preguntas ORDER BY orden ASC");
    return rows;
  }

  static async obtenerRespuestas() {
    // sin filtro porque la tabla no tiene pregunta_id
    const [rows] = await pool.query("SELECT * FROM respuestas_posibles");
    return rows;
  }
}
