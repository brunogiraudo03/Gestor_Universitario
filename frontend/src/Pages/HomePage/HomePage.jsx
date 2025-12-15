// src/pages/HomePage/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';


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
    title: 'Estadísticas',
    icon: 'fa-chart-bar',
    path: '/estadisticas'
  }
];

function HomePage() {
  return (
    <div className="container text-center py-5">
      
      
      <div className="mb-5">
        <h1 className="display-3 fw-bold header-title-bordered">
          Tu Carrera, Simplificada
        </h1>
        <p className="lead fs-4  mt-3">
          Selecciona una herramienta para empezar a organizar tu vida universitaria.
        </p>
      </div>

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
      
      <footer className="mt-5 pt-4 border-top">
        <p style={{ fontSize: '0.8rem', color: '#adb5bd' }}>Created by Bruno Giraudo</p>
      </footer>
    </div>
  );
}

export default HomePage;