const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware para registrar peticiones en la consola
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} - Petición: ${req.method} ${req.url}`);
    next();
});

// Ruta principal: Entrega el archivo HTML
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        console.error(`ERROR: No se encontró el archivo index.html en ${__dirname}`);
        res.status(404).send('<h1>Error 404</h1><p>Archivo index.html no encontrado.</p>');
    }
});

const PORT = 3000;

process.on('uncaughtException', (err) => {
    console.error('Excepción no capturada:', err);
});

app.listen(PORT, () => {
    console.log('==============================================');
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('==============================================');
});
