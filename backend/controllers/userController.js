import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/pool.js";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Todos los campos son requeridos" });

    const userExists = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (userExists)
      return res.status(400).json({ message: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashed,
    ]);

    res.json({ success: true, message: "Usuario registrado con éxito" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (!user)
      return res.status(400).json({ message: "Credenciales inválidas" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await db.get("SELECT id, name, email FROM users WHERE id = ?", [
      req.user.id,
    ]);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
