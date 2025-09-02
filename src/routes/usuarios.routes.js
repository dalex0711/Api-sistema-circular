import { Router } from "express";
import { UserController } from "../controllers/usuario.controller.js";

const router = Router();

// Crear usuario
router.post("/usuarios", UserController.crearUsuario);

// Buscar usuario por username
router.post("/usuarios/buscar", UserController.buscarPorUsername);

export default router;
