import express from "express";
import db from "../db/pool.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware para validar token JWT
function verifyToken(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) return res.status(403).json({ mensaje: "Token requerido" });

  const token = tokenHeader.split(" ")[1]; // "Bearer <token>"
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: "Token inválido" });
    req.userId = decoded.id;
    next();
  });
}

// ✅ GET /api/gastos
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const rows = await db.all(
      "SELECT categoria, monto, fecha FROM gastos WHERE usuario_id = ? ORDER BY fecha DESC",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error obteniendo gastos:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// ✅ POST /api/gastos
router.post("/", verifyToken, async (req, res) => {
  try {
    const { categoria, monto, fecha } = req.body;
    const userId = req.userId;

    if (!categoria || !monto || !fecha) {
      return res.status(400).json({ mensaje: "Faltan datos del gasto" });
    }

    await db.run(
      "INSERT INTO gastos (categoria, monto, fecha, usuario_id) VALUES (?, ?, ?, ?)",
      [categoria, monto, fecha, userId]
    );

    res.status(201).json({ mensaje: "Gasto agregado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar gasto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

export default router;
