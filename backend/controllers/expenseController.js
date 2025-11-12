import db from "../db/pool.js";

export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await db.all(
      "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC",
      [req.user.id]
    );
    res.json({ success: true, expenses });
  } catch (err) {
    next(err);
  }
};

export const addExpense = async (req, res, next) => {
  try {
    const { category, amount, date } = req.body;
    if (!category || !amount || !date)
      return res.status(400).json({ message: "Todos los campos son requeridos" });

    await db.run(
      "INSERT INTO expenses (category, amount, date, user_id) VALUES (?, ?, ?, ?)",
      [category, amount, date, req.user.id]
    );
    res.json({ success: true, message: "Gasto agregado correctamente" });
  } catch (err) {
    next(err);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, amount, date } = req.body;
    await db.run(
      "UPDATE expenses SET category = ?, amount = ?, date = ? WHERE id = ? AND user_id = ?",
      [category, amount, date, id, req.user.id]
    );
    res.json({ success: true, message: "Gasto actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.run("DELETE FROM expenses WHERE id = ? AND user_id = ?", [
      id,
      req.user.id,
    ]);
    res.json({ success: true, message: "Gasto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
