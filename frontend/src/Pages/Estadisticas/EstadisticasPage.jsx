// src/pages/Estadisticas/EstadisticasPage.jsx
import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registramos los componentes de Chart.js que vamos a usar
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente principal de la página de estadísticas
function EstadisticasPage({ planes, loading }) {

  // Lógica de cálculo de estadísticas
  const { statsPorAnio, statsGenerales } = useMemo(() => {
    if (!planes || planes.length === 0) {
      return { statsPorAnio: [], statsGenerales: {} };
    }

    const agrupados = planes.reduce((acc, plan) => {
      const año = plan.año;
      if (!acc[año]) {
        acc[año] = [];
      }
      acc[año].push(plan);
      return acc;
    }, {});

    const statsAnuales = Object.keys(agrupados).map(año => {
      const materiasDelAnio = agrupados[año];
      const total = materiasDelAnio.length;
      
      let aprobadas = 0;
      let regulares = 0;
      let desaprobadas = 0;
      let sinCursar = 0;

      materiasDelAnio.forEach(materia => {
        const nota = materia.nota;
        if (nota === null || nota === undefined || nota === '' || nota === '-') {
          sinCursar++;
        } else if (nota >= 6) {
          aprobadas++;
        } else if (nota >= 4 && nota < 6) {
          regulares++;
        } else if (nota < 4) {
          desaprobadas++;
        }
      });
      
      return {
        año,
        total,
        aprobadas,
        regulares,
        desaprobadas,
        sinCursar,
      };
    });

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
    <div className="container py-4">
      <div className="card shadow-sm mb-4 bg-dark text-white">
        <div className="card-body text-center">
          <h4 className="mb-0">Estadísticas de la Carrera</h4>
        </div>
      </div>
      
      <div className="row">
        {statsPorAnio.sort((a,b) => a.año - b.año).map(stats => (
          <div key={stats.año} className="col-lg-6 mb-4">
            <AnioCard stats={stats} />
          </div>
        ))}
      </div>

      <CarreraCard stats={statsGenerales} />
    </div>
  );
}


function AnioCard({ stats }) {
  const data = {
    labels: ['Aprobadas', 'Regulares', 'Desaprobadas', 'Sin Cursar'],
    datasets: [
      {
        label: '# de Materias',
        data: [stats.aprobadas, stats.regulares, stats.desaprobadas, stats.sinCursar],
        backgroundColor: [
          'rgba(40, 167, 69, 0.7)',
          'rgba(255, 193, 7, 0.7)',
          'rgba(220, 53, 69, 0.7)',
          'rgba(108, 117, 125, 0.7)',
        ],
        borderColor: [
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  };

  const yearToText = { 1: 'Primer Año', 2: 'Segundo Año', 3: 'Tercer Año', 4: 'Cuarto Año', 5: 'Quinto Año' };

  const materiasPorAprobar = stats.total - stats.aprobadas;

  const renderMensajeProgreso = () => {
    if (stats.total === 0) {
      return null;
    }
    
    if (materiasPorAprobar === 0) {
      return (
        <p className="fw-bold fs-5 text-success">
          <i className="fas fa-trophy me-2"></i>
          ¡Año completado! 🎉
        </p>
      );
    }
    
    if (stats.aprobadas === 0) {
      return (
        <p className="fw-bold fs-5 text-warning">
          <i className="fas fa-book-reader me-2"></i>
          Aún no tienes materias aprobadas este año.
        </p>
      );
    }

    const textoMaterias = materiasPorAprobar === 1 ? 'materia' : 'materias';
    return (
      <p className="fw-bold fs-5 text-info">
        <i className="fas fa-pencil-alt me-2"></i>
        Te {materiasPorAprobar === 1 ? 'queda' : 'quedan'} {materiasPorAprobar} {textoMaterias} por aprobar.
      </p>
    );
  };


  return (
    <div className="card h-100 shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">{yearToText[stats.año] || `Año ${stats.año}`}</h5>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="row align-items-center flex-grow-1">
          <div className="col-md-7">
            {renderMensajeProgreso()}
            <hr />
            <p className="mb-1"><strong>Aprobadas:</strong> {stats.aprobadas} de {stats.total}</p>
            <p className="mb-1"><strong>Regulares:</strong> {stats.regulares}</p>
            <p className="mb-1"><strong>Desaprobadas:</strong> {stats.desaprobadas}</p>
          </div>
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: true }} />
          </div>
        </div>
      </div>
    </div>
  );
}

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