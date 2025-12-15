import React, { useMemo } from 'react';

const yearToText = { 1: 'Primer Año', 2: 'Segundo Año', 3: 'Tercer Año', 4: 'Cuarto Año', 5: 'Quinto Año' };

function ElectivasTable({ electivas, handleDelete, handleToEdit }) {
    // Agrupamos por año igual que en el plan
    const electivasAgrupadas = useMemo(() => {
        return electivas.reduce((acc, el) => {
            const anio = el.año || 'Sin Año'; 
            (acc[anio] = acc[anio] || []).push(el);
            return acc;
        }, {});
    }, [electivas]);

    return (
        <div>
            {Object.keys(electivasAgrupadas).sort((a, b) => a - b).map(año => (
                <div key={año} className="mb-5">
                    <h4 className="mb-3">{yearToText[año] || `Año ${año}`}</h4>
                    <div className="table-responsive rounded border">
                        <table className="table table-striped table-hover align-middle mb-0 plan-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Créditos</th> 
                                    <th>Modalidad</th>
                                    <th>Carga Horaria</th>
                                    <th>Nota</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {electivasAgrupadas[año].map((el) => (
                                    <tr key={el.id}>
                                        <td>{el.nombre}</td>
                                        <td className="fw-bold text-info">{el.creditos} pts</td>
                                        <td>{el.modalidad}</td>
                                        <td>{el.carga_horaria ? `${el.carga_horaria}hs` : '-'}</td>
                                        <td className="fw-bold text-center">{el.nota ?? '-'}</td>
                                        <td className="text-end">
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleToEdit(el.id)} title="Editar"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(el.id)} title="Eliminar"><i className="fas fa-trash-alt"></i></button>
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
export default ElectivasTable;