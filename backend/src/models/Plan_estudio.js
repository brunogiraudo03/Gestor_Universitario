
import { DataTypes } from 'sequelize'; 

const planAtributtes = {
  nro_materia: {
    type: DataTypes.INTEGER,           
    primaryKey: true                   
  },
  año: {
    type: DataTypes.INTEGER,          
    allowNull: false
  },
  nombre: {
    type: DataTypes.TEXT,    
    allowNull: false
  },
  modalidad: {
    type: DataTypes.TEXT,             
    allowNull: false
  },
  regulares: {
    type: DataTypes.TEXT,              
    allowNull: true
  },
  aprobadas: {
    type: DataTypes.TEXT,             
    //  permite nulos
    allowNull: true
  },
  carga_horaria: {
    type: DataTypes.INTEGER,           
  },
  nota: {
    type: DataTypes.INTEGER,           
    //  permite nulos
    allowNull: true
  }
};

const planMethods = {
};

const planModel = {
    planAtributtes,
    planMethods
};

export { planModel };
