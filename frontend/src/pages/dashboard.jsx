import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { apiRequest } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ChatFinanciero from "../components/ChatFinanciero";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({ name: "", email: "" });
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({ category: "", amount: "", date: "" });
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const [profileRes, expensesRes] = await Promise.all([
          apiRequest("/users/profile", "GET", null, token),
          apiRequest("/expenses", "GET", null, token),
        ]);
        setUser(profileRes.user);
        setExpenses(expensesRes.expenses.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleDarkMode = () => {
    const mode = !darkMode;
    setDarkMode(mode);
    localStorage.setItem("darkMode", mode);
  };

  const formatCLP = (value) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);

  // Agregar gasto
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.date) return alert("Completa todos los campos");

    await apiRequest("/expenses", "POST", form, token);
    setForm({ category: "", amount: "", date: "" });
    setShowForm(false);
    const updated = await apiRequest("/expenses", "GET", null, token);
    setExpenses(updated.expenses);
  };

  // Editar gasto
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editing.category || !editing.amount || !editing.date)
      return alert("Completa todos los campos");
    await apiRequest(`/expenses/${editing.id}`, "PUT", editing, token);
    const updated = await apiRequest("/expenses", "GET", null, token);
    setExpenses(updated.expenses);
    setEditing(null);
  };

  // Eliminar gasto
  const handleDelete = async (id) => {
    await apiRequest(`/expenses/${id}`, "DELETE", null, token);
    setExpenses(expenses.filter((e) => e.id !== id));
    setConfirmDelete(null);
  };

  // Datos para gráfico
  const chartData = useMemo(() => {
    const grouped = expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { category: e.category, total: 0 };
      acc[e.category].total += e.amount;
      return acc;
    }, {});
    return Object.values(grouped);
  }, [expenses]);

  if (isLoading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <p className="text-xl animate-pulse">Cargando tu dashboard...</p>
      </div>
    );

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* Navbar superior */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold"
          >
            FinancIA 💼
          </motion.h1>

          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded font-medium transition ${
              darkMode
                ? "bg-gray-200 text-gray-900 hover:bg-white"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>

        {/* Resumen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl shadow-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div>
            <h2 className="text-gray-400 text-sm uppercase">Usuario</h2>
            <p className="text-lg font-semibold mt-1">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm uppercase">Total Gastos</h2>
            <p className="text-lg font-semibold mt-1 text-blue-500">
              {formatCLP(expenses.reduce((acc, e) => acc + Number(e.amount), 0))}
            </p>
          </div>
          <div>
            <h2 className="text-gray-400 text-sm uppercase">Último Gasto</h2>
            <p className="text-lg font-semibold mt-1">
              {expenses.length ? expenses[0].date : "—"}
            </p>
          </div>
        </motion.div>

        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl p-6 mb-8 shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Resumen visual</h2>
          {expenses.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={darkMode ? "#4B5563" : "#E5E7EB"}
                />
                <XAxis dataKey="category" stroke={darkMode ? "#E5E7EB" : "#374151"} />
                <YAxis stroke={darkMode ? "#E5E7EB" : "#374151"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    color: darkMode ? "#F9FAFB" : "#111827",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => formatCLP(value)}
                />
                <Bar dataKey="total" fill={darkMode ? "#3B82F6" : "#2563EB"} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400">Sin datos aún</p>
          )}
        </motion.div>

        {/* Tabla de gastos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl p-6 shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Historial de gastos</h2>
          {expenses.length ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    className={`text-left border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <th className="py-2 px-3">Categoría</th>
                    <th className="py-2 px-3">Monto</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr
                      key={e.id}
                      className={`border-b hover:bg-gray-100/10 ${
                        darkMode ? "border-gray-700" : "border-gray-100"
                      }`}
                    >
                      <td className="py-2 px-3">{e.category}</td>
                      <td className="py-2 px-3">{formatCLP(e.amount)}</td>
                      <td className="py-2 px-3">{e.date}</td>
                      <td className="py-2 px-3 text-center space-x-2">
                        <button
                          onClick={() => setEditing(e)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setConfirmDelete(e)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400">Aún no has registrado gastos</p>
          )}
        </motion.div>
        <ChatFinanciero />

        {/* Botón flotante */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700"
        >
          {showForm ? "×" : "+"}
        </motion.button>

        {/* Modal Nuevo gasto */}
        {showForm && (
          <div
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-6 rounded-xl w-full max-w-sm shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Agregar gasto</h3>
              <form onSubmit={handleAdd} className="space-y-3">
                <input
                  placeholder="Categoría"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  placeholder="Monto"
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal editar */}
        {editing && (
          <div
            onClick={() => setEditing(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-6 rounded-xl w-full max-w-sm shadow-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">Editar gasto</h3>
              <form onSubmit={handleEdit} className="space-y-3">
                <input
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  value={editing.amount}
                  onChange={(e) => setEditing({ ...editing, amount: e.target.value })}
                  type="number"
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal eliminar */}
        {confirmDelete && (
          <div
            onClick={() => setConfirmDelete(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`p-6 rounded-xl w-full max-w-sm ${
                darkMode ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-center text-red-500 mb-4">
                ⚠️ Confirmar eliminación
              </h3>
              <p className="text-center mb-4">
                ¿Eliminar el gasto de <b>{confirmDelete.category}</b> por{" "}
                <b>{formatCLP(confirmDelete.amount)}</b>?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
