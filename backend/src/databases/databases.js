import { Sequelize } from 'sequelize';
import { planModel } from '../models/Plan_estudio.js';
import { electivaModel } from '../models/Electiva.js'; // 1. IMPORTAR

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './plan.sqlite',
});

// Definir tabla Plan de Estudio
sequelize.define('plan_estudio', planModel.planAtributtes, {
  ...planModel.planMethods,
  tableName: 'plan_estudio',
  timestamps: false
});

// definir tabla electivas
sequelize.define('electiva', electivaModel.electivaAttributes, {
  tableName: 'electivas', // Nombre de la tabla en la BD
  timestamps: false
});

export default sequelize;