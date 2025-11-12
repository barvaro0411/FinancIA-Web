# 📊 FinancIA Web

**Aplicación web de finanzas personales con inteligencia artificial integrada**

FinancIA Web es una plataforma fullstack para gestión de finanzas personales que permite a los usuarios registrar gastos, visualizar estadísticas y recibir recomendaciones financieras mediante un asistente de IA.

---

## 🚀 Características Principales

### Gestión de Gastos
- **Registro de transacciones** con categorías personalizadas
- **Historial completo** de movimientos financieros
- **Filtros avanzados** por fecha, categoría y monto
- **Edición y eliminación** de gastos registrados

### Visualización de Datos
- **Dashboard interactivo** con gráficos en tiempo real
- **Estadísticas detalladas** usando Recharts
- **Resumen mensual** de ingresos y gastos
- **Análisis por categorías** con gráficos de torta y barras

### Asistente de IA
- **Recomendaciones financieras** personalizadas
- **Análisis de patrones** de gasto
- **Consejos de ahorro** basados en tu historial
- **Integración con API de IA** para respuestas inteligentes

### Seguridad
- **Autenticación JWT** segura
- **Encriptación de contraseñas** con bcryptjs
- **Sesiones protegidas** con tokens
- **Validación de datos** en frontend y backend

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Framework de interfaz de usuario
- **Vite 5.4.8** - Build tool y dev server ultra rápido
- **React Router DOM 6.23** - Navegación SPA
- **Tailwind CSS 3.4.13** - Framework de estilos utility-first
- **Framer Motion 12.23** - Animaciones fluidas
- **Recharts 3.3** - Gráficos y visualizaciones
- **React Hot Toast 2.6** - Notificaciones elegantes

### Backend
- **Node.js** con **Express 5.1.0** - Servidor HTTP
- **SQLite3 5.1.7** - Base de datos SQL ligera
- **JWT (jsonwebtoken 9.0.2)** - Autenticación basada en tokens
- **bcryptjs 3.0.2** - Hash de contraseñas
- **express-validator 7.3** - Validación de datos
- **CORS 2.8.5** - Política de recursos cruzados
- **dotenv 17.2.3** - Variables de entorno

---

## 📁 Estructura del Proyecto

```
FinancIA-Web/
├── backend/
│   ├── controllers/        # Lógica de negocio
│   ├── routes/            # Definición de endpoints
│   │   ├── userRoutes.js      # Registro y login
│   │   ├── expenseRoutes.js   # CRUD de gastos
│   │   └── aiRoutes.js        # Asistente IA
│   ├── middleware/        # Autenticación y validación
│   ├── db/               # Configuración de base de datos
│   ├── .env              # Variables de entorno
│   ├── server.js         # Punto de entrada del servidor
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Vistas principales
│   │   │   ├── login.jsx        # Página de inicio de sesión
│   │   │   ├── register.jsx     # Página de registro
│   │   │   └── dashboard.jsx    # Panel principal
│   │   ├── context/         # Estado global (Context API)
│   │   ├── routes/          # Configuración de rutas
│   │   ├── utils/           # Funciones auxiliares
│   │   ├── app.jsx          # Componente raíz
│   │   ├── main.jsx         # Punto de entrada
│   │   └── index.css        # Estilos globales
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Instalación y Configuración

### Requisitos Previos
- Node.js 16+ instalado
- npm o yarn
- Git

### Clonar el Repositorio
```bash
git clone https://github.com/barvaro0411/FinancIA-Web.git
cd FinancIA-Web
```

### Configurar Backend

1. Navegar a la carpeta del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo `.env` con las siguientes variables:
```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura
DATABASE_URL=./database.sqlite
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El backend estará corriendo en `http://localhost:3000`

### Configurar Frontend

1. Abrir una nueva terminal y navegar al frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

---

## 🔌 API Endpoints

### Autenticación
- `POST /api/users/register` - Registrar nuevo usuario
- `POST /api/users/login` - Iniciar sesión

### Gestión de Gastos
- `GET /api/expenses` - Obtener todos los gastos del usuario
- `POST /api/expenses` - Crear nuevo gasto
- `PUT /api/expenses/:id` - Actualizar gasto existente
- `DELETE /api/expenses/:id` - Eliminar gasto

### Asistente IA
- `POST /api/ai/chat` - Enviar consulta al asistente financiero

---

## 💡 Uso de la Aplicación

### 1. Registro e Inicio de Sesión
- Crea una cuenta con email y contraseña
- Inicia sesión para acceder al dashboard

### 2. Registrar Gastos
- Haz clic en "Agregar Gasto"
- Completa: monto, categoría, descripción y fecha
- Guarda para ver el gasto en tu historial

### 3. Visualizar Estadísticas
- El dashboard muestra automáticamente:
  - Total de gastos del mes
  - Gráficos por categoría
  - Tendencias de gasto
  - Balance actual

### 4. Usar el Asistente IA
- Accede a la sección de IA
- Pregunta sobre tus finanzas
- Recibe consejos personalizados

---

## 🎨 Características de Diseño

- **Interfaz moderna** con Tailwind CSS
- **Animaciones suaves** con Framer Motion
- **Responsive design** - funciona en móvil, tablet y desktop
- **Tema oscuro/claro** (opcional)
- **Gráficos interactivos** con Recharts
- **Notificaciones toast** para feedback visual

---

## 🔒 Seguridad

- **Passwords hasheados** - nunca se almacenan en texto plano
- **Tokens JWT** - autenticación segura sin sesiones
- **Validación** - datos validados en cliente y servidor
- **CORS configurado** - solo orígenes permitidos
- **Variables de entorno** - credenciales protegidas

---

## 🚧 Próximas Características

- [ ] Exportar datos a CSV/Excel
- [ ] Metas de ahorro personalizadas
- [ ] Notificaciones por email
- [ ] Integración con bancos (API bancaria)
- [ ] Multi-moneda
- [ ] Compartir gastos con otros usuarios
- [ ] Modo offline con sincronización

---

## 👨‍💻 Autor

**Álvaro Acosta**
- GitHub: [@barvaro0411](https://github.com/barvaro0411)

---

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un [issue](https://github.com/barvaro0411/FinancIA-Web/issues)
- Contacta al autor

---

**Hecho con ❤️ en Chile**
