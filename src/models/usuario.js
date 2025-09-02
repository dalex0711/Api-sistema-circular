import { pool } from "../config/db.js";
export class UserModel {
  // Crear usuario
  static async crear({ username, code_id, fecha_nacimiento }) {
    const [result] = await pool.query(
      "INSERT INTO usuarios (username, code_id, fecha_nacimiento) VALUES (?, ?, ?)",
      [username, code_id, fecha_nacimiento]
    );
    return result.insertId;
  }

  // Buscar usuario por username
  static async buscarPorUsername(username) {
    const [rows] = await pool.query(
      "SELECT id, username FROM usuarios WHERE username = ?",
      [username]
    );
    return rows[0] || null;
  }
}
