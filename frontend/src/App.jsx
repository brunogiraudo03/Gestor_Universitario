import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Menu from './components/Menu';
import PlanTable from './components/PlanTable';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Menu />
      <main className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            className="form-control me-3"
            style={{ maxWidth: '300px' }}
            placeholder="Buscar materia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-danger">
            <i className="fas fa-plus me-2"></i> Agregar Materia
          </button>
        </div>

      </main>
    </>
  );
}

export default App;

