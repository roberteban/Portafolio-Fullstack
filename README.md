
# Portafolio Fullstack - Angular & Node.js

Este proyecto corresponde a un portafolio personal desarrollado con el stack Angular en el frontend y Node.js en el backend. Su objetivo es presentar mis habilidades como desarrollador y ofrecer un canal de contacto profesional.

> Proyecto desarrollado como desafío técnico fullstack. Diseño basado en una plantilla de Figma adaptada a mis necesidades.

## Tecnologías utilizadas

**Frontend**
- Angular 18
- Bootstrap 5
- SCSS
- TypeScript

**Backend**
- Node.js
- Express.js
- Mongoose
- Axios
- Nodemailer

**Otros**
- MongoDB Atlas
- GitHub REST API
- dotenv

## Estructura del Proyecto

```
app-portfolio/
├── frontend/    # Aplicación Angular
└── backend/     # API REST Node.js + MongoDB
```

## Instrucciones de instalación (entorno local)

### Requisitos
- Node.js 16 o superior
- Angular CLI
- MongoDB Atlas (se puede usar una cuenta gratuita)
- Token de GitHub (para conexión a la API)
- Cuenta SMTP (Gmail u otro proveedor)

### Clonar el repositorio

```bash
git clone https://github.com/roberteban/Portafolio-Fullstack.git
cd Portafolio-Fullstack
```

### Configurar el backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Configurar el frontend

```bash
cd ../frontend
npm install
ng serve
```

Luego abrir en el navegador: `http://localhost:4200`

## Despliegue

Este portafolio puede ser desplegado de manera separada (frontend y backend) en servicios como:

- Vercel / Netlify (Frontend)
- Render / Railway (Backend)
- También puede utilizarse una solución Dockerizada o un VPS.

📍 **Enlace al sitio desplegado:** _pendiente de publicación_

## Autor

Roberto Castillo Riquelme  
robertocastillocontact@gmail.com
