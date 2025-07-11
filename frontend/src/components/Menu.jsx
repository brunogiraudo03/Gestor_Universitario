import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark rounded-bottom shadow px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          🎓 Plan de Estudio
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/electivas" className="nav-link">Electivas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/aprobadas" className="nav-link">Aprobadas</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
