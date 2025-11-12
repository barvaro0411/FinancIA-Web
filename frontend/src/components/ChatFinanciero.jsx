// frontend/src/components/ChatFinanciero.jsx
import React, { useState } from "react";
import { apiRequest } from "../utils/api";

export default function ChatFinanciero() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply("");
    try {
      const res = await apiRequest("/ai/chat", "POST", { message }, token);
      setReply(res.reply);
    } catch (e) {
      setReply("Hubo un problema al consultar la IA. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-6 card-light dark:card-dark">
      <h3 className="text-lg font-semibold text-indigo-600 mb-3">
        💬 Asistente Financiero (IA)
      </h3>

      <textarea
        className="input h-28"
        placeholder="Pregúntame sobre tus gastos, cómo ahorrar, tendencias, etc."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex gap-2 mt-3">
        <button onClick={handleSend} className="btn btn-primary" disabled={loading}>
          {loading ? "Consultando..." : "Enviar"}
        </button>
        <button
          onClick={() => {
            setMessage("");
            setReply("");
          }}
          className="btn btn-secondary"
        >
          Limpiar
        </button>
      </div>

      {reply && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 whitespace-pre-line text-sm">
          {reply}
        </div>
      )}
    </div>
  );
}
