# 🎓 Gestor Universitario

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado%20(v1.0)-success)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue)

Un sistema integral Full Stack diseñado para ayudar a estudiantes universitarios a organizar su carrera académica. Permite gestionar planes de estudio, realizar seguimiento de materias electivas, monitorear créditos y visualizar el progreso mediante estadísticas gráficas en tiempo real.

---

## 🚀 Características Principales

* **📚 Gestión del Plan de Estudio:** CRUD completo (Crear, Leer, Actualizar, Borrar) de materias. Permite registrar estado (cursada/aprobada), notas, carga horaria y correlatividades.
* **⭐ Módulo de Electivas:** Sección dedicada para gestionar materias optativas y seguimiento de **créditos académicos**.
* **📊 Dashboard Estadístico:** Visualización de datos con **Chart.js**. Calcula automáticamente:
    * Promedio general y por año.
    * Porcentaje de la carrera completado.
    * Gráficos de distribución de estados (Aprobadas vs. Regulares vs. Pendientes).
* **🔍 Búsqueda y Filtrado:** Buscador en tiempo real para localizar materias rápidamente.
* **🎨 Interfaz UI/UX Moderna:** Diseño responsivo utilizando **Bootstrap 5** personalizado con **Sass**, con modo oscuro y navegación intuitiva.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto demuestra la implementación de una arquitectura **Full Stack** robusta:

### Frontend (Cliente)
* ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) **React 19:** Construcción de interfaces dinámicas basada en componentes.
* ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&style=flat) **Vite:** Entorno de desarrollo ultrarrápido.
* ![Bootstrap](https://img.shields.io/badge/-Bootstrap%205-7952B3?logo=bootstrap&logoColor=white&style=flat) **Bootstrap 5 + Sass:** Estilizado y personalización avanzada de temas CSS.
* **React Router:** Manejo de rutas y navegación SPA (Single Page Application).
* **React Hook Form:** Gestión eficiente y validación de formularios.
* **Axios:** Consumo de API REST.
* **Chart.js:** Visualización de datos y gráficas.

### Backend (Servidor)
* ![NodeJS](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=flat) **Node.js:** Entorno de ejecución para el servidor.
* ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=flat) **Express:** Framework para la creación de la API RESTful.
* ![Sequelize](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=flat) **Sequelize ORM:** Manejo de modelos y consultas a la base de datos.
* ![SQLite](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=flat) **SQLite:** Base de datos relacional ligera y local.

---

## ⚙️ Instalación y Puesta en Marcha

Este proyecto utiliza una arquitectura separada (Frontend y Backend), por lo que requiere dos terminales ejecutándose simultáneamente.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/brunogiraudo03/Gestor_Universitario.git](https://github.com/brunogiraudo03/Gestor_Universitario.git)
cd Gestor_Universitario

2- Configurar el Backend (Servidor)
Abre una terminal y navega a la carpeta del backend:

```bash
cd backend
npm install        # Instalar dependencias
npm run dev        # Iniciar servidor (corre en puerto 3000)

Deberías ver: "Servidor escuchando en http://localhost:3000" y "Conectado a la base de datos".

3- Configurar el Frontend (Cliente)
Abre otra terminal y navega a la carpeta del frontend:

´´´bash
cd frontend
npm install        # Instalar dependencias
npm run dev        # Iniciar Vite (corre en puerto 5173)

Abre tu navegador en http://localhost:5173 para usar la aplicación

'''

###🧠 Aprendizajes Clave
El desarrollo de este proyecto me permitió consolidar conocimientos técnicos avanzados en:

Arquitectura MVC y API REST: Diseño de un backend estructurado separando Rutas, Controladores (Servicios) y Modelos de datos para una base de código escalable.

Manejo de Estado en React: Implementación de Hooks (useState, useEffect) y useMemo para optimizar cálculos costosos en el dashboard de estadísticas.

Integración Front-Back: Comunicación asíncrona fluida entre cliente y servidor mediante Axios, gestionando métodos HTTP (GET, POST, PUT, DELETE).

ORM y SQL: Modelado de tablas relacionales con Sequelize y sincronización automática con SQLite, manejando tipos de datos y restricciones.

Componentización y Reutilización: Refactorización de código para crear componentes modulares (ej: PlanTable, ElectivasForm) y Hooks personalizados como useForm.

**Desarrollado por Bruno Giraudo - Estudiante de Ingeniería en Sistemas**