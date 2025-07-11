
import { DataTypes } from 'sequelize'; // corregido: se escribe con mayúscula la D

// Definimos los atributos del modelo Plan_estudio
const planAtributtes = {
  nro_materia: {
    type: DataTypes.INTEGER,           // Otro entero
    primaryKey: true                   
  },
  año: {
    type: DataTypes.INTEGER,           // Tipo entero
    allowNull: false
  },
  nombre: {
    type: DataTypes.TEXT,    // Texto largo (por ejemplo: "Matemática Discreta")
    allowNull: false
  },
  modalidad: {
    type: DataTypes.TEXT,              // Texto: puede ser "Presencial", "Virtual", etc.
    allowNull: false
  },
  regulares: {
    type: DataTypes.TEXT,              // Podés usar esto para guardar materias correlativas regularizadas
    //  permite nulos
    allowNull: true
  },
  aprobadas: {
    type: DataTypes.TEXT,              // Lo mismo, pero para correlativas aprobadas
    //  permite nulos
    allowNull: true
  },
  carga_horaria: {
    type: DataTypes.INTEGER,           // Total de horas de la materia (ej: 64)
  },
  nota: {
    type: DataTypes.INTEGER,           // Nota final (puede ser null si no está rendida)
    //  permite nulos
    allowNull: true
  }
};

const planMethods = {
    // Definimos los métodos del modelo Plan_estudio
    // Estos métodos se ejecutan cuando se hace una operación en el modelo Plan_estudio
};

const planModel = {
    // Definimos un objeto con atributros y metodos
    planAtributtes,
    planMethods
};

export { planModel };
