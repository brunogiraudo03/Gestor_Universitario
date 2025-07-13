// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar d-flex flex-column p-3 sidebar-container">
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <i className="fas fa-home fa-fw me-2"></i>Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/plan" className="nav-link">
            <i className="fas fa-book-open fa-fw me-2"></i>Mi Plan de Estudio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/electivas" className="nav-link">
            <i className="fas fa-star fa-fw me-2"></i>Electivas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/calendario" className="nav-link">
            <i className="fas fa-calendar-alt fa-fw me-2"></i>Calendario
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/estadisticas" className="nav-link">
            <i className="fas fa-chart-bar fa-fw me-2"></i>Estadísticas
          </NavLink>
        </li>
      </ul>
      <hr/>
      <div>
        <a href="#" className="nav-link">
          <i className="fas fa-sign-out-alt fa-fw me-2"></i>Cerrar Sesión
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;