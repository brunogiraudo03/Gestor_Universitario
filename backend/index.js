// Importa la app de Express desde el archivo app.js
// Esta app ya tiene configurado JSON, CORS y cualquier middleware que hayas agregado
import app from './app.js';

// Define el puerto en el que va a escuchar el servidor
const port = 4001;

// Ruta de prueba en la raíz ("/")
// Cuando accedés a http://localhost:4001, esta función responde con un HTML básico
app.get('/', (req, res) => {
    const htmlResponse = `
        <h1>Bienvenido a mi API RESTful</h1>
        <p>Esta es mi primera página de respuesta HTML.</p>
        <p>Puedes probar la API RESTful en la siguiente URL:</p>
        <p>http://localhost:4001/api/v1/hello</p>
    `;
    
    // Envía el HTML como respuesta al navegador
    res.send(htmlResponse);
});

// Inicia el servidor y lo pone a escuchar en el puerto especificado
// Cuando arranca correctamente, muestra un mensaje por consola
app.listen(port, () => {
    console.log(`Servidor de API RESTful corriendo en http://localhost:${port}`);
});
