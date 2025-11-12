## 🔐 Configuración de variables de entorno

Para ejecutar el backend, copia el archivo `backend/.env.example` y renómbralo a `backend/.env`. Luego reemplaza los valores por los reales:

```bash
cp backend/.env.example backend/.env
```

Variables incluidas:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura
DATABASE_URL=./database.sqlite
CORS_ORIGINS=http://localhost:5173,http://192.168.100.25:5173
```

Asegúrate de que `backend/.env` esté ignorado por Git (incluido en `.gitignore`). Nunca subas tus secretos al repositorio público.
