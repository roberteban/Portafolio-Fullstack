# Portafolio Fullstack - Backend

Este repositorio contiene el backend del portafolio personal desarrollado con **Node.js**, **Express** y **MongoDB**. Expone una API RESTful para gestionar la información del portafolio (proyectos y formulario de contacto), e integra servicios externos como GitHub y Nodemailer.

> Desarrollado como parte de un desafío técnico fullstack.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **Mongoose**
- **Nodemailer**
- **Axios**
- **dotenv**
- **MongoDB Atlas**

---

## 📁 Estructura

```
backend/
├── src/
│   ├── config/             # Conexión a MongoDB
│   ├── controllers/        # Lógica de contacto y GitHub
│   ├── models/             # Esquemas Mongoose
│   ├── routes/             # Endpoints de la API
│   ├── services/           # Integraciones con GitHub y correo
│   └── app.js              # Punto de entrada
├── .env.example            # Variables necesarias (sin secretos)
├── package.json            # Dependencias y scripts
└── test-connection.js      # Verifica conexión a MongoDB
```

---

## ⚙️ Configuración del entorno local

### 1. Clonar repositorio y acceder al backend

```bash
git clone https://github.com/roberteban/Portafolio-Fullstack.git
cd Portafolio-Fullstack/backend
```

### 2. Crear archivo de entorno

```bash
cp .env.example .env
```

Completa las variables necesarias en `.env` según tu configuración.

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor localmente

```bash
npm start
```

El backend estará disponible en `http://localhost:3000`.

---

## 🔐 Variables requeridas

```env
MONGODB_URI=...
GITHUB_USERNAME=...
GITHUB_TOKEN=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASS=...
PORT=3000
NODE_ENV=development
```

---

## 🌐 Backend desplegado

El backend está desplegado públicamente en **Render**:

🔗 [`https://portafolio-fullstack-1yma.onrender.com`](https://portafolio-fullstack-1yma.onrender.com)

---

## 🧪 Verificar conexión a MongoDB

Antes de iniciar el servidor, puedes ejecutar:

```bash
node test-connection.js
```

---

## 📦 Scripts disponibles

- `npm start` → Inicia el servidor en modo producción
- `npm run dev` → Usa `nodemon` para desarrollo (si está instalado)

---

## ✉️ Contacto

Roberto Castillo Riquelme  
robertocastillocontact@gmail.com
