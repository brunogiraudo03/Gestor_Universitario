// src/pages/Estadisticas/EstadisticasPage.jsx
import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registramos los componentes de Chart.js que vamos a usar
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente principal de la página de estadísticas
function EstadisticasPage({ planes, loading }) {

  // Usamos useMemo para que los cálculos complejos solo se hagan cuando los 'planes' cambien
  const { statsPorAnio, statsGenerales } = useMemo(() => {
    if (!planes || planes.length === 0) {
      return { statsPorAnio: [], statsGenerales: {} };
    }

    // 1. AGRUPAR MATERIAS POR AÑO
    const agrupados = planes.reduce((acc, plan) => {
      const año = plan.año;
      if (!acc[año]) {
        acc[año] = [];
      }
      acc[año].push(plan);
      return acc;
    }, {});

    // 2. CALCULAR ESTADÍSTICAS PARA CADA AÑO
    const statsAnuales = Object.keys(agrupados).map(año => {
      const materiasDelAnio = agrupados[año];
      const total = materiasDelAnio.length;
      
      let aprobadas = 0;
      let regulares = 0;
      let desaprobadas = 0;
      let sinCursar = 0;

      materiasDelAnio.forEach(materia => {
        const nota = materia.nota;
        if (nota === null || nota === undefined || nota === '-') {
          sinCursar++;
        } else if (nota >= 6) {
          aprobadas++;
        } else if (nota >= 4 && nota <= 5) {
          regulares++;
        } else if (nota <= 3) {
          desaprobadas++;
        }
      });
      
      const porcentajeCompletado = total > 0 ? ((aprobadas / total) * 100) : 0;
      const porcentajeRestante = 100 - porcentajeCompletado;

      return {
        año,
        total,
        aprobadas,
        regulares,
        desaprobadas,
        sinCursar,
        porcentajeRestante
      };
    });

    // 3. CALCULAR ESTADÍSTICAS GENERALES
    const totalCarrera = planes.length;
    const aprobadasCarrera = planes.filter(p => p.nota >= 6).length;
    const porcentajeCarrera = totalCarrera > 0 ? ((aprobadasCarrera / totalCarrera) * 100) : 0;
    
    return { 
      statsPorAnio: statsAnuales, 
      statsGenerales: { totalCarrera, aprobadasCarrera, porcentajeCarrera }
    };

  }, [planes]);

  if (loading) {
    return <p className="text-center">Calculando estadísticas...</p>;
  }

  return (
    <div>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Estadísticas de la Carrera</h4>
        </div>
      </div>
      
      {/* Layout de 2 columnas para las tarjetas de cada año */}
      <div className="row">
        {statsPorAnio.sort((a,b) => a.año - b.año).map(stats => (
          <div key={stats.año} className="col-lg-6 mb-4">
            <AnioCard stats={stats} />
          </div>
        ))}
      </div>

      {/* Tarjeta final con la barra de progreso general */}
      <CarreraCard stats={statsGenerales} />
    </div>
  );
}

// Componente para la tarjeta de cada año (para mantener el código limpio)
function AnioCard({ stats }) {
  const data = {
    labels: ['Aprobadas', 'Regulares', 'Desaprobadas', 'Sin Cursar'],
    datasets: [
      {
        label: '# de Materias',
        data: [stats.aprobadas, stats.regulares, stats.desaprobadas, stats.sinCursar],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)', // Verde para aprobadas
          'rgba(255, 193, 7, 0.7)',  // Amarillo para regulares
          'rgba(220, 53, 69, 0.7)',  // Rojo para desaprobadas
          'rgba(108, 117, 125, 0.7)', // Gris para sin cursar
        ],
        borderColor: [
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  };

  const yearToText = { 1: 'Primer Año', 2: 'Segundo Año', 3: 'Tercer Año', 4: 'Cuarto Año', 5: 'Quinto Año' };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">{yearToText[stats.año] || `Año ${stats.año}`}</h5>
      </div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-7">
            <p className="mb-1"><strong>Aprobadas:</strong> {stats.aprobadas} de {stats.total}</p>
            <p className="mb-1"><strong>Regulares:</strong> {stats.regulares}</p>
            <p className="mb-1"><strong>Desaprobadas:</strong> {stats.desaprobadas}</p>
            <hr />
            <p className="fw-bold fs-5">Te queda por aprobar el {stats.porcentajeRestante.toFixed(1)}%</p>
          </div>
          <div className="col-md-5">
            <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para la tarjeta final de la carrera
function CarreraCard({ stats }) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Progreso Total de la Carrera</h5>
      </div>
      <div className="card-body">
        <p>Has aprobado <strong>{stats.aprobadasCarrera}</strong> de <strong>{stats.totalCarrera}</strong> materias totales.</p>
        <div className="progress" style={{ height: '30px', fontSize: '1rem' }}>
          <div 
            className="progress-bar bg-danger fw-bold" 
            role="progressbar" 
            style={{ width: `${stats.porcentajeCarrera}%` }}
          >
            {stats.porcentajeCarrera.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasPage;