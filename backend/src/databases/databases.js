import { Sequelize } from 'sequelize';
import { planModel } from '../models/Plan_estudio.js';

// indicamos que motor de bd usamos y donde se ubica el archivo
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './plan.sqlite', // apuntás a tu base con datos
});

// definir tablas y modelos
sequelize.define('plan_estudio', planModel.planAtributtes, {
  ...planModel.planMethods,
  tableName: 'plan_estudio',
  timestamps: false
});


export default sequelize;