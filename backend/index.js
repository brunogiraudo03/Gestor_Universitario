// index.js (Backend)
import app from './app.js'; // Importa la instancia de Express configurada
import planRouter from './src/routes/plan.route.js';
import bodyParser from 'body-parser'; // Aunque ya usas express.json en app.js, body-parser aquí es redundante si solo manejas JSON. Puedes quitarlo si solo es JSON.
import sequelize from './src/databases/databases.js';

try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conectado a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

// const app = express(); // ELIMINA ESTA LÍNEA, ya la importamos de app.js
const PORT = 3000;

// Middleware (si ya está en app.js, no es necesario aquí de nuevo)
// app.use(bodyParser.json()); // Si express.json ya está en app.js, este es redundante.

app.get('/', (req, res) => {
  res.send('Backend funcionando 👌');
});

// Usar el router
app.use('/api/plan', planRouter);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});