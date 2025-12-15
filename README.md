# 🎓 Gestor Universitario

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado%20(v1.0)-success)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

Un sistema **Full Stack** diseñado para ayudar a estudiantes universitarios a organizar y visualizar su carrera académica.  
Permite gestionar planes de estudio, materias electivas, créditos académicos y el progreso general mediante estadísticas gráficas en tiempo real.

---

## 🚀 Características Principales

- **📚 Gestión del Plan de Estudio**  
  CRUD completo de materias (Crear, Leer, Actualizar, Eliminar).  
  Registro de estado (Cursada / Aprobada / Pendiente), notas, carga horaria y correlatividades.

- **⭐ Módulo de Electivas**  
  Gestión de materias optativas y seguimiento de **créditos académicos**.

- **📊 Dashboard Estadístico**  
  Visualización con **Chart.js** que calcula automáticamente:
  - Promedio general y por año
  - Porcentaje de carrera completada
  - Distribución de estados (Aprobadas, Regulares y Pendientes)

- **🔍 Búsqueda y Filtrado**  
  Buscador en tiempo real para localizar materias rápidamente.

- **🎨 Interfaz UI/UX Moderna**  
  Diseño responsivo con **Bootstrap 5 + Sass**, modo oscuro y navegación intuitiva.

---

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) **React 19**
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) **Vite**
- ![Bootstrap](https://img.shields.io/badge/-Bootstrap%205-7952B3?logo=bootstrap&logoColor=white&style=flat) **Bootstrap 5 + Sass**
- **React Router** – Navegación SPA
- **React Hook Form** – Manejo y validación de formularios
- **Axios** – Consumo de API REST
- **Chart.js** – Visualización de datos

### Backend (Servidor)

- ![NodeJS](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat) **Node.js**
- ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) **Express**
- ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=flat) **Sequelize ORM**
- ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=flat) **SQLite**

---

## ⚙️ Instalación y Puesta en Marcha

El proyecto utiliza una arquitectura separada (**Frontend + Backend**), por lo que requiere dos terminales ejecutándose simultáneamente.

### 1️⃣ Clonar el repositorio

git clone https://github.com/brunogiraudo03/Gestor_Universitario.git  
cd Gestor_Universitario

### 2️⃣ Configurar el Backend (Servidor)

cd backend  
npm install  
npm run dev  

El servidor se ejecuta en:  
http://localhost:3000

---

### 3️⃣ Configurar el Frontend (Cliente)

cd frontend  
npm install  
npm run dev  

La aplicación estará disponible en:  
http://localhost:5173

---

## 🧠 Aprendizajes Clave

Este proyecto permitió consolidar conocimientos en:

- **Arquitectura MVC y API REST**  
  Separación clara entre Rutas, Controladores y Modelos para un backend escalable.

- **Manejo de Estado en React**  
  Uso de Hooks (`useState`, `useEffect`, `useMemo`) para optimizar cálculos del dashboard.

- **Integración Frontend – Backend**  
  Comunicación asíncrona con Axios utilizando métodos HTTP (GET, POST, PUT, DELETE).

- **ORM y SQL**  
  Modelado relacional con Sequelize y sincronización automática con SQLite.

- **Componentización y Reutilización**  
  Creación de componentes modulares (PlanTable, ElectivasForm) y hooks personalizados.

---

## 👨‍💻 Autor

**Bruno Giraudo**  
Estudiante de Ingeniería en Sistemas  

Proyecto académico desarrollado con fines educativos.
