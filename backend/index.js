import express from 'express';
import planRouter from './src/routes/plan.route.js'; // Asegurate de que la ruta sea correcta
import bodyParser from 'body-parser';
import sequelize from './src/databases/databases.js';


try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conectado a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando 👌');
});

// Usar el router
app.use('/api/plan', planRouter);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
