
# Backend del Portafolio Fullstack

Este backend fue desarrollado con Node.js y Express.js como parte de un portafolio personal. Su objetivo es gestionar la comunicación entre el frontend y servicios externos como GitHub y un servidor SMTP, permitiendo tanto la visualización de proyectos como el envío de mensajes desde un formulario de contacto.

---

## Tecnologías utilizadas

- **Node.js** con **Express.js** para la creación de la API REST.
- **Mongoose** para la conexión con MongoDB Atlas.
- **Nodemailer** para el envío de correos electrónicos.
- **Axios** para consumo de la API de GitHub.
- **dotenv** para gestión de variables de entorno.

---

## Estructura del proyecto

```
backend/src/
├── config/           # Conexión a MongoDB
├── controllers/      # Lógica para cada ruta
├── models/           # Esquemas de datos con Mongoose
├── routes/           # Definición de endpoints
├── services/         # Servicios externos (GitHub, Email)
└── app.js            # Punto de entrada principal
```

---

## Endpoints principales

### `GET /api/repositories`
Consulta los repositorios públicos del usuario de GitHub configurado, los guarda en MongoDB y los devuelve en formato JSON.

### `POST /api/contact`
Recibe un mensaje desde el formulario de contacto del frontend. El mensaje es almacenado y enviado por correo.

```json
{
  "name": "Nombre del remitente",
  "email": "correo@example.com",
  "subject": "Asunto del mensaje",
  "message": "Contenido del mensaje"
}
```

---

## Variables de entorno

El archivo `.env` debe contener las siguientes variables (ver `.env.example`):

```env
GITHUB_USERNAME=...
GITHUB_TOKEN=...
MONGODB_URI=...
EMAIL_USER=...
EMAIL_PASS=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
PORT=3000
NODE_ENV=development
```

---

## Instalación y ejecución

```bash
cd backend
cp .env.example .env
npm install
npm start
```

> Para desarrollo con recarga automática: `npm run dev`

La API estará disponible en `http://localhost:3000`

---

## Autor

Roberto Castillo Riquelme  
rcastillor@utem.cl  
Escuela de Informática - UTEM
