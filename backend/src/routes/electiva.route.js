import express from 'express';
import { electivaService } from '../services/electiva.service.js';

const router = express.Router();

// Obtener todas
router.get('/obtener', async (req, res) => {
    try {
        const electivas = await electivaService.getAll();
        res.status(200).json(electivas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener electivas' });
    }
});

// Crear
router.post('/crear', async (req, res) => {
    try {
        const electiva = await electivaService.createElectiva(req.body);
        res.status(201).json(electiva);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear electiva' });
    }
});

// Borrar
router.delete('/borrar/:id', async (req, res) => {
    try {
        const result = await electivaService.deleteElectiva(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar electiva' });
    }
});

// Actualizar
router.put('/actualizar/:id', async (req, res) => {
    try {
        const result = await electivaService.updateElectiva(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar electiva' });
    }
});

export default router;