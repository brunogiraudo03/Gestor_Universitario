// src/App.jsx
import React, { useState, useEffect } from 'react'; // 1. Importamos hooks
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './Pages/HomePage/HomePage';
import PlanPage from './Pages/Plan/PlanPage';
import EstadisticasPage from './Pages/Estadisticas/EstadisticasPage';
import planesService from './services/plan.services'; // 3. Importamos el servicio
import './App.css';

function App() {
  // 4. El estado ahora vive en el componente padre
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 5. La función para obtener los datos también vive aquí
  const fetchPlanes = async () => {
    try {
      setLoading(true);
      const response = await planesService.obtenerPlanes();
      setPlanes(response || []);
    } catch (error) {
      console.error('Error al obtener los planes:', error);
    } finally {
      setLoading(false);
    }
  };

  // 6. Obtenemos los datos una sola vez cuando la app se carga
  useEffect(() => {
    fetchPlanes();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Sidebar />
        <main className="main-content p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* 7. Pasamos los datos y funciones como props a los hijos que los necesiten */}
            <Route 
              path="/plan" 
              element={<PlanPage planes={planes} loading={loading} fetchPlanes={fetchPlanes} />} 
            />
            <Route 
              path="/estadisticas" 
              element={<EstadisticasPage planes={planes} loading={loading} />} 
            />

            {/* ...otras rutas... */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;