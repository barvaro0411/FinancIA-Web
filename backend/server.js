// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; // 👈 Nueva ruta para la IA
import { errorHandler } from "./middleware/errorHandler.js";
import "./db/pool.js";

dotenv.config();

const app = express();

// ✅ CORS configurado para PC y celular (red local)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.100.25:5173", // 👈 tu IP local
    ],
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());

// ✅ Rutas API
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoutes); // 👈 Asistente IA

// ✅ Middleware de errores
app.use(errorHandler);

// ✅ Servidor en puerto definido
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
