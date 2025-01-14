import express, { Application } from "express";
import { Database } from "./database/connection";
import { UserRoutes } from "./routes/user.routes";
import { RepairRoutes } from "./routes/repair.routes";

const app: Application = express();
const PORT = 3000;
// Middleware
app.use(express.json());

// Inicializar base de datos
const database = new Database();
database.connect();

// Rutas
app.use("/api/v1/users", new UserRoutes().router);
app.use("/api/v1/repairs", new RepairRoutes().router);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
