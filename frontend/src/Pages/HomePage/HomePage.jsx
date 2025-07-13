// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Importamos los nuevos estilos

// Definimos los elementos de navegación en un array para que sea más fácil de manejar
const navItems = [
  {
    title: 'Mi Plan de Estudio',
    icon: 'fa-book-open',
    path: '/plan'
  },
  {
    title: 'Electivas',
    icon: 'fa-star',
    path: '/electivas'
  },
  {
    title: 'Calendario',
    icon: 'fa-calendar-alt',
    path: '/calendario'
  },
  {
    title: 'Estadísticas',
    icon: 'fa-chart-bar',
    path: '/estadisticas'
  },
  {
    title: 'To-do List',
    icon: 'fa-tasks',
    path: '#' // '#' para links que aún no hacen nada
  },
  {
    title: 'Cerrar Sesión',
    icon: 'fa-sign-out-alt',
    path: '#'
  }
];

function HomePage() {
  return (
    <div className="container text-center py-5">
      
      {/* SECCIÓN DE BIENVENIDA */}
      <div className="mb-5">
        <h1 className="display-3 fw-bold" style={{ color: 'var(--color-header-bg)' }}>
          Tu Carrera, Simplificada
        </h1>
        <p className="lead fs-4 text-muted mt-3">
          Selecciona una herramienta para empezar a organizar tu vida universitaria.
        </p>
      </div>

      {/* SECCIÓN DE TARJETAS DE NAVEGACIÓN */}
      <div className="row g-4 justify-content-center">
        {navItems.map((item, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <Link to={item.path} className={`nav-card ${item.path === '#' ? 'disabled' : ''}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
                  <i className={`fas ${item.icon} card-icon mb-3`}></i>
                  <h5 className="card-title fw-bold">{item.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* TU CRÉDITO */}
      <footer className="mt-5 pt-4 border-top">
        <p style={{ fontSize: '0.8rem', color: '#adb5bd' }}>Created by Bruno Giraudo</p>
      </footer>
    </div>
  );
}

export default HomePage;