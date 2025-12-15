import app from './app.js';
import planRouter from './src/routes/plan.route.js';
import electivaRouter from './src/routes/electiva.route.js'; // 1. Importar ruta
import sequelize from './src/databases/databases.js';

try {
    await sequelize.authenticate();
    await sequelize.sync(); // Esto creará la tabla 'electivas' automáticamente
    console.log('Conectado a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Backend funcionando 👌');
});

// Usar los routers
app.use('/api/plan', planRouter);
app.use('/api/electivas', electivaRouter); // 2. Usar ruta

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});