import express from 'express';
import cors from 'cors';

const app = express();

// Middleware que permite a Express interpretar automáticamente cuerpos JSON en las peticiones (por ejemplo, POST y PUT)
app.use(express.json());

// Configuración de CORS (Cross-Origin Resource Sharing)
// El "*" permite que cualquier origen (dominio) pueda hacer peticiones a este backend.
// Es útil para desarrollo, pero en producción conviene reemplazar "*" por la URL de tu frontend.
const corsOptions = {
    origin: "*",
}

// Aplica el middleware de CORS con la configuración definida arriba
// Esto es necesario para que tu frontend (por ejemplo, hecho con Vite) pueda comunicarse con este backend sin ser bloqueado
app.use(cors(corsOptions));


// Exporta la instancia de Express para poder usarla en otro archivo (como index.js)
export default app;