import sequelize from '../databases/databases.js';

//obtener todo el plan de estudio
const getAll = async () => {
    const plan = await sequelize.models.plan_estudio.findAll();
    return plan.map(plan => plan.dataValues);
}

//obtener plan de estudio materia
const getByMateria = async (año, nro_materia) => {
    const plan = await sequelize.models.plan_estudio.findAll({
        where: {
            año: año,
            nro_materia: nro_materia
        }
    });
    return plan.map(plan => plan.dataValues);
}

//obtener plan de estudio materia
const getByModalidad = async (año, modalidad) => {
    const plan = await sequelize.models.plan_estudio.findAll({
        where: {
            año: año,
            modalidad: modalidad
        }
    });
    return plan.map(plan => plan.dataValues);
}

//obtener por nota
const getByNota = async (nota) => {
    const plan = await sequelize.models.plan_estudio.findAll({
        where: {
            nota: nota
        }
    });
    return plan.map(plan => plan.dataValues);
}

//crear plan de estudio
const create = async (plan) => {
    const newPlan = await sequelize.models.plan_estudio.create(plan);
    return newPlan.dataValues;
}

const planService = {
    getAll,
    getByMateria,
    getByModalidad,
    getByNota,
    create
}

export { planService };