import { DataTypes } from 'sequelize';

const electivaAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  creditos: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  año: {
    type: DataTypes.INTEGER,  
    allowNull: true
  },
  modalidad: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  carga_horaria: {
    type: DataTypes.INTEGER,
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  regulares: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aprobadas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
};

const electivaModel = {
    electivaAttributes
};

export { electivaModel };