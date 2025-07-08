# Portafolio Fullstack - Backend

Este repositorio contiene el backend del portafolio personal desarrollado con Node.js, Express y MongoDB. Proporciona una API RESTful para gestionar el contenido del portafolio, incluyendo proyectos, contacto y consumo de la API de GitHub.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Mongoose
- Nodemailer
- Axios
- dotenv
- MongoDB Atlas

## 📁 Estructura

```
backend/
├── src/
│   ├── config/             # Configuración de base de datos
│   ├── controllers/        # Lógica de controladores (GitHub, contacto)
│   ├── models/             # Esquemas de MongoDB (Contact, Repository)
│   ├── routes/             # Endpoints de API
│   ├── services/           # Integraciones externas (GitHub API, Email)
│   └── app.js              # Punto de entrada del backend
├── .env.example            # Variables de entorno necesarias
├── package.json            # Dependencias y scripts
└── test-connection.js      # Script auxiliar para verificar conexión
```

## ⚙️ Configuración del entorno

1. Clona el repositorio y accede a la carpeta del backend:

```bash
git clone https://github.com/roberteban/Portafolio-Fullstack.git
cd Portafolio-Fullstack/backend
```

2. Copia el archivo `.env.example` y agrega tus credenciales reales:

```bash
cp .env.example .env
```

3. Instala las dependencias:

```bash
npm install
```

4. Ejecuta el servidor:

```bash
npm start
```

El servidor quedará disponible en `http://localhost:3000`.

## 🔐 Variables de entorno requeridas

```
MONGODB_URI=<tu_conexion_mongodb>
GITHUB_USERNAME=<tu_usuario_github>
GITHUB_TOKEN=<tu_token_personal>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<tu_correo_salida>
EMAIL_PASS=<tu_contraseña_app>
PORT=3000
NODE_ENV=development
```

## 🧪 Prueba de conexión

Puedes ejecutar el script `test-connection.js` para verificar la conexión a MongoDB antes de iniciar el servidor.

```bash
node test-connection.js
```

## 📦 Scripts disponibles

- `npm start` → Ejecuta el servidor
- `npm run dev` → Usa `nodemon` para desarrollo (si está instalado)

## ✉️ Contacto

Roberto Castillo Riquelme  
robertocastillocontact@gmail.com
