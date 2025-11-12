// backend/controllers/aiController.js
import db from "../db/pool.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ message: "Debes enviar un 'message'." });
    }

    // Obtén últimos gastos del usuario
    const expenses = await db.all(
      "SELECT category, amount, date FROM expenses WHERE user_id = ? ORDER BY date DESC LIMIT 30",
      [req.user.id]
    );

    const prompt = `
Eres un asesor financiero personal. Da respuestas claras, accionables y amables.
Considera estos gastos (JSON): ${JSON.stringify(expenses)}
Pregunta del usuario: "${message}"

Requisitos:
- Si detectas categorías con mayor gasto, menciónalas y sugiere acciones concretas.
- Si puedes, estima ahorro potencial en CLP.
- Usa tono cercano y positivo.
- No inventes datos que no estén en la lista.
`;

    // Llamada a Gemini
    const url = `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    });

    const data = await resp.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta en este momento.";

    res.json({ success: true, reply });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ success: false, message: "Error al comunicarse con Gemini." });
  }
};
