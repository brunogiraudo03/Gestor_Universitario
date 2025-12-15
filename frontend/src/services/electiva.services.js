import axios from 'axios';
import { API_URL_ELECTIVAS } from '../constants/constants';

const obtenerElectivas = async () => {
    try {
        const response = await axios.get(`${API_URL_ELECTIVAS}/obtener`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener electivas:', error);
        throw error;
    }
}

const crearElectiva = async (data) => {
    try {
        const response = await axios.post(`${API_URL_ELECTIVAS}/crear`, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear electiva:', error);
        throw error;
    }
}

const borrarElectiva = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_ELECTIVAS}/borrar/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al borrar electiva:', error);
        throw error;
    }  
}

const actualizarElectiva = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL_ELECTIVAS}/actualizar/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar electiva:', error);
        throw error;
    }
}

const electivaService = {
    obtenerElectivas,
    crearElectiva,
    borrarElectiva,
    actualizarElectiva
};

export default electivaService;