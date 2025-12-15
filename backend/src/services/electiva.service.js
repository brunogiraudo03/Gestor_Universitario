import sequelize from '../databases/databases.js';
import { Op } from 'sequelize';

// Obtener todas las electivas
const getAll = async () => {
    const electivas = await sequelize.models.electiva.findAll();
    return electivas.map(e => e.dataValues);
}

// Crear electiva
const createElectiva = async (body) => {
    const newElectiva = await sequelize.models.electiva.create({
        nombre: body.nombre,
        creditos: body.creditos, 
        año: body.año,
        modalidad: body.modalidad,
        carga_horaria: body.carga_horaria,
        nota: body.nota,
        regulares: body.regulares,
        aprobadas: body.aprobadas
    });
    return newElectiva.dataValues;
}

// Borrar electiva
const deleteElectiva = async (id) => {
    const electiva = await sequelize.models.electiva.findByPk(id);
    if (!electiva) {
        throw new Error('Electiva no encontrada');
    }
    await electiva.destroy();
    return { message: 'Electiva eliminada correctamente' };
}

// Actualizar electiva
const updateElectiva = async (id, body) => {
    const electiva = await sequelize.models.electiva.findByPk(id);
    if (!electiva) {
        throw new Error('Electiva no encontrada');
    }
    electiva.nombre = body.nombre;
    electiva.creditos = body.creditos;
    electiva.año = body.año;
    electiva.modalidad = body.modalidad;
    electiva.carga_horaria = body.carga_horaria;
    electiva.nota = body.nota;
    electiva.regulares = body.regulares;
    electiva.aprobadas = body.aprobadas;
    
    await electiva.save();
    return { message: 'Electiva actualizada correctamente' };
}

const electivaService = {
    getAll,
    createElectiva,
    deleteElectiva,
    updateElectiva
}

export { electivaService };