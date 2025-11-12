// frontend/src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://192.168.100.25:3001/api";

// Función genérica para llamadas HTTP
export async function apiRequest(endpoint, method = "GET", body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error en la solicitud");
    return data;
  } catch (error) {
    console.error("❌ Error en apiRequest:", error.message);
    throw error;
  }
}

