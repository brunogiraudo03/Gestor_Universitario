import axios from 'axios';
import { API_URL } from '../config';

const obtenerPlanes = async () => {
    try {
        const response = await axios.get(`${API_URL}/obtener`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los planes:', error);
        throw error;
    }
}

const buscarPlanPorMateria = async (nombre) => {
    if (!nombre) return []; // Evitar consulta vacía
    try {
        const response = await axios.get(`${API_URL}/buscar/${nombre}`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar el plan por materia:', error);
        throw error;
    }
};


const crearPlan = async (planData) => {
    try {
        const response = await axios.post(`${API_URL}/crear`, planData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el plan:', error);
        throw error;
    }
}

const borrarPlan = async (planId) => {
    try {
        const response = await axios.delete(`${API_URL}/borrar/${planId}`);
        return response.data;
    } catch (error) {
        console.error('Error al borrar el plan:', error);
        throw error;
    }  
}

const actualizarPlan = async (planId, planData) => {
    try {
        const response = await axios.put(`${API_URL}/actualizar/${planId}`, planData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el plan:', error);
        throw error;
    }
}


const planesService = {
    obtenerPlanes,
    crearPlan,
    borrarPlan,
    actualizarPlan,
    buscarPlanPorMateria
};

export default planesService;