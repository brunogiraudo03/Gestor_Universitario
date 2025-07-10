// src/routes/plan.router.js
import express from 'express';
import { planService } from '../services/plan.service.js';

const router = express.Router();

// Obtener todos los planes de estudio
router.get('/obtener', async (req, res) => {
    try {
        const plan = await planService.getAll();
        res.status(200).json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener todos los planes de estudio' });
    }
});

// Crear un plan de estudio
router.post('/crear', async (req, res) => {
    try {
        const plan = await planService.createPlan(req.body);
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un plan de estudio' });
    }
});

// Eliminar un plan de estudio
router.delete('/borrar/:id', async (req, res) => {
    try {
        const result = await planService.deletePlan(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar un plan de estudio' });
    }
});

// Actualizar un plan de estudio
router.put('/actualizar/:id', async (req, res) => {
    try {
        const result = await planService.updatePlan(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar un plan de estudio' });
    }
});

export default router;
