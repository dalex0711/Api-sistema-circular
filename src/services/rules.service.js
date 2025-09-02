import { Engine } from "json-rules-engine";
import { pool } from "../config/db.js";

export class RulesService {
  static async calcularDiagnostico(respuestas) {
    // 1. Obtener todas las reglas desde la BD (o podrías tenerlas en JSON)
    const [rules] = await pool.query("SELECT * FROM diagnosticos_catalogo");

    // 2. Inicializar motor de reglas
    const engine = new Engine();

    // 🔹 Aquí deberías mapear las reglas de tu catálogo a formato JSON-Rules
    // Ejemplo muy simple: si tiene más de 3 respuestas "Sí" => riesgo Alto
    // (esto lo deberías personalizar con tus 32 reglas reales)
    engine.addRule({
      conditions: {
        any: respuestas.map(r => ({
          fact: "respuesta_" + r.preguntaId,
          operator: "equal",
          value: 1
        }))
      },
      event: {
        type: "riesgo-alto",
        params: {
          diagnosticoId: 2 // ejemplo
        }
      }
    });

    // 3. Definir hechos (facts) desde las respuestas
    let facts = {};
    respuestas.forEach(r => {
      facts["respuesta_" + r.preguntaId] = r.respuestaId === 1 ? 1 : 0;
    });

    // 4. Ejecutar reglas
    const { events } = await engine.run(facts);

    // 5. Si alguna regla disparó, tomar el diagnosticoId
    if (events.length > 0) {
      return events[0].params.diagnosticoId;
    }

    // fallback (por si no matchea ninguna regla)
    return 1; // ejemplo: diagnóstico "bajo riesgo"
  }
}
