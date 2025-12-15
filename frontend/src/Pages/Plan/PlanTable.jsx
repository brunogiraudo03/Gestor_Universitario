// src/components/PlanTable.jsx
import React, { useMemo } from 'react';


const yearToText = { 1: 'Primer Año', 2: 'Segundo Año', 3: 'Tercer Año', 4: 'Cuarto Año', 5: 'Quinto Año' };

function PlanTable({ planes, handleDelete, handleToEdit }) {
    const planesAgrupados = useMemo(() => {
        return planes.reduce((acc, plan) => {
            (acc[plan.año] = acc[plan.año] || []).push(plan);
            return acc;
        }, {});
    }, [planes]);

    return (
        <div>
            {Object.keys(planesAgrupados).sort((a, b) => a - b).map(año => (
                <div key={año} className="mb-5">
                    {/* Un título simple para cada año */}
                    <h4 className="mb-3">{yearToText[año] || `Año ${año}`}</h4>
                    <div className="table-responsive rounded border">
                        <table className="table table-striped table-hover align-middle mb-0 plan-table">
                            <thead>
                                <tr>
                                    <th>Número</th>
                                    <th>Nombre</th>
                                    <th>Modalidad</th>
                                    <th>Carga Horaria</th>
                                    <th>Nota</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planesAgrupados[año].map((plan) => (
                                    <tr key={plan.nro_materia}>
                                        <td>{plan.nro_materia}</td>
                                        <td>{plan.nombre}</td>
                                        <td>{plan.modalidad}</td>
                                        <td>{plan.carga_horaria}hs</td>
                                        <td className="fw-bold text-center">{plan.nota ?? '-'}</td>
                                        <td className="text-end">
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleToEdit(plan.nro_materia)} title="Editar"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(plan.nro_materia)} title="Eliminar"><i className="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default PlanTable;