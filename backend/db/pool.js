import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./db/local.db",
  driver: sqlite3.Database,
});

const db = {
  run: async (query, params = []) => {
    const database = await dbPromise;
    return database.run(query, params);
  },
  get: async (query, params = []) => {
    const database = await dbPromise;
    return database.get(query, params);
  },
  all: async (query, params = []) => {
    const database = await dbPromise;
    return database.all(query, params);
  },
};

// Inicializa tablas si no existen
(async () => {
  const database = await dbPromise;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
  await database.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      amount INTEGER NOT NULL,
      date TEXT NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
  console.log("✅ Base de datos SQLite inicializada correctamente.");
})();

export default db;
