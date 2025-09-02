import express from "express";
import usuarioRoutes from "./src/routes/usuarios.routes.js";
import evaluacionRoutes from "./src/routes/evaluaciones.routes.js";
import preguntaRoutes from "./src/routes/pregunta.routes.js";


const app = express();
app.use(express.json());

app.use("/api", usuarioRoutes);
app.use("/api", evaluacionRoutes);
app.use("/api", preguntaRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
export default app