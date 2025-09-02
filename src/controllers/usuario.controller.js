import { UserModel } from "../models/usuario.js";

export class UserController {
  // POST /api/usuarios  -> Crear usuario
  static async crearUsuario(req, res) {
    try {
      const { username, code_id, fecha_nacimiento } = req.body;

      if (!username || !code_id || !fecha_nacimiento) {
        return res.status(400).json({ ok: false, error: "Faltan campos requeridos" });
      }

      const userId = await UserModel.crear({ username, code_id, fecha_nacimiento });

      return res.status(201).json({
        ok: true,
        message: "Usuario creado exitosamente",
        userId,
      });
    } catch (error) {
      console.error("Error en crearUsuario:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  // POST /api/usuarios/buscar  -> Validar si existe un username
  static async buscarPorUsername(req, res) {
    try {
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({ ok: false, error: "El username es requerido" });
      }

      const user = await UserModel.buscarPorUsername(username);

      if (user) {
        return res.json({
          ok: true,
          existe: true,
          user, // devuelve datos básicos
        });
      } else {
        return res.json({
          ok: true,
          existe: false,
          message: "Usuario no encontrado",
        });
      }
    } catch (error) {
      console.error("Error en buscarPorUsername:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  }
}
