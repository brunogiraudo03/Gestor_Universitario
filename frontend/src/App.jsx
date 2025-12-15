// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './Pages/HomePage/HomePage';
import PlanPage from './Pages/Plan/PlanPage';
import EstadisticasPage from './Pages/Estadisticas/EstadisticasPage';
import planesService from './services/plan.services';
import ElectivasPage from './Pages/Electivas/ElectivasPage'; 

import './App.css';

function App() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);

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
            
            <Route 
              path="/plan" 
              element={<PlanPage planes={planes} loading={loading} fetchPlanes={fetchPlanes} />} 
            />
            
            {/* Aquí es donde usas el componente, por eso debe estar importado arriba */}
            <Route path="/electivas" element={<ElectivasPage />} />

            <Route 
              path="/estadisticas" 
              element={<EstadisticasPage planes={planes} loading={loading} />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;