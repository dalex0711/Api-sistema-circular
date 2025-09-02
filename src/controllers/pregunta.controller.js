import { PreguntaModel } from "../models/pregunta.js";

export class PreguntaController {
  static async listarPreguntas(req, res) {
    try {
      // Traer preguntas y respuestas desde el modelo
      const preguntas = await PreguntaModel.obtenerPreguntas();
      const respuestas = await PreguntaModel.obtenerRespuestas();

      // Asignar todas las respuestas a cada pregunta
      const preguntasConRespuestas = preguntas.map((pregunta) => ({
        ...pregunta,
        respuestas
      }));

      res.json({ ok: true, preguntas: preguntasConRespuestas });
    } catch (error) {
      console.error("Error al listar preguntas:", error);
      res.status(500).json({ ok: false, error: "Error al listar preguntas" });
    }
  }
}
