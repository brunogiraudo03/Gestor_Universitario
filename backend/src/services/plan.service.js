import sequelize from '../databases/databases.js';
import { Op } from 'sequelize';

//obtener todo el plan de estudio
const getAll = async () => {
    const plan = await sequelize.models.plan_estudio.findAll();
    return plan.map(plan => plan.dataValues);
}

//crear plan de estudio
const createPlan = async (body) => {
    const newPlan = await sequelize.models.plan_estudio.create({
        nro_materia: body.nro_materia,
        año: body.año,
        nombre: body.nombre,
        modalidad: body.modalidad,
        regulares: body.regulares,
        aprobadas: body.aprobadas,
        carga_horaria: body.carga_horaria,
        nota: body.nota
    });
    return newPlan.dataValues;
}

const deletePlan = async (id) => {
    const plan = await sequelize.models.plan_estudio.findByPk(id);
    if (!plan) {
        throw new Error('Plan de estudio no encontrado');
    }
    await plan.destroy();
    return { message: 'Plan de estudio eliminado correctamente' };
}

const updatePlan = async (id, body) => {
    const plan = await sequelize.models.plan_estudio.findByPk(id);
    if (!plan) {
        throw new Error('Plan de estudio no encontrado');
    }
    plan.año = body.año;
    plan.nro_materia = body.nro_materia;
    plan.nombre = body.nombre;
    plan.modalidad = body.modalidad;
    plan.regulares = body.regulares;
    plan.aprobadas = body.aprobadas;
    plan.carga_horaria = body.carga_horaria;
    plan.nota = body.nota;
    await plan.save();
    return { message: 'Plan de estudio actualizado correctamente' };
}


const getByMateria = async (nombre) => {
    let where = {};

    if (nombre) {
        where.nombre = { [Op.like]: `%${nombre}%` };
    }

    const plan = await sequelize.models.plan_estudio.findAll({ where });
    return plan.map(p => p.dataValues);
};



const planService = {
    getAll,
    createPlan,
    deletePlan,
    updatePlan,
    getByMateria
}

export { planService };