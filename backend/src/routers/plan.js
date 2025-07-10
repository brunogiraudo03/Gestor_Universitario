import express from 'express';
import { planService } from '../services/plan.service.js';

{
    const router = express.Router();

    // Obtener todos los plan de estudio
    router.get('/', async (req, res) => {
        try {
            const plan = await planService.getAll();
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener todos los plan de estudio' });
        }
    });

    // Crear un plan de estudio
    router.post('/', async (req, res) => {
        try {
            const plan = await planService.createPlan(req.body);
            res.status(201).json(plan);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear un plan de estudio' });
        }
    });

    // Eliminar un plan de estudio
    router.delete('/:id', async (req, res) => {
        try {
            const plan = await planService.deletePlan(req.params.id);
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar un plan de estudio' });
        }
    });

    // Actualizar un plan de estudio
    router.put('/:id', async (req, res) => {
        try {
            const plan = await planService.updatePlan(req.params.id, req.body);
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar un plan de estudio' });
        }
    });

    const planRouter = {
        router
    }

}

export { planRouter };