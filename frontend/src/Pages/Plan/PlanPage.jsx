// src/pages/Plan/PlanPage.jsx

import React, { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import planesService from '../../services/plan.services'; 
import PlanTable from './PlanTable';
import PlanForm from './PlanForm';
import './PlanPage.css';

function PlanPage({ planes, loading, fetchPlanes }) {
    const { register, handleSubmit, reset } = useForm();
    const [toEdit, setToEdit] = useState(null);
    const [accion, setAccion] = useState('C');
    
    
    const [filteredPlanes, setFilteredPlanes] = useState([]);

    useEffect(() => {
        setFilteredPlanes(planes);
    }, [planes]);

    const onSubmitSearch = (data) => {
        const searchTerm = data.search.trim().toLowerCase();
        
        if (!searchTerm) {
            setFilteredPlanes(planes);
        } else {
            const result = planes.filter(plan => 
                plan.nombre.toLowerCase().includes(searchTerm)
            );
            setFilteredPlanes(result);
        }
    };

    const handleClearSearch = () => {
        setFilteredPlanes(planes);
        reset(); 
    };

    const handleDelete = async (nro_materia) => {
        await planesService.borrarPlan(nro_materia);
        await fetchPlanes(); 
    };

    const handleToEdit = (nro_materia) => {
        const planEncontrado = planes.find(p => p.nro_materia === nro_materia);
        setToEdit(planEncontrado);
        setAccion('M');
    };

    return (
        <>
            {accion === 'C' && (

                <div className="card shadow-sm plan-container-card">
                    <div className="card-header">
                        <h5 className="mb-0">Mi Plan de Estudio</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmitSearch)} className="mb-4">
                            <div className="row g-2">
                                <div className="col-sm">
                                    <input
                                        {...register('search')}
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar materia por nombre..."
                                    />
                                </div>
                                <div className="col-sm-auto">
                                    {/* CAMBIO: Usamos las nuevas clases para los botones */}
                                    <button type="submit" className="btn btn-search-custom">Buscar</button>
                                </div>
                                <div className="col-sm-auto">
                                    <button type="button" className="btn btn-clear-custom" onClick={handleClearSearch}>Limpiar</button>
                                </div>
                                <div className="col-sm-auto ms-auto">
                                    <button type="button" className="btn btn-danger" onClick={() => { setAccion('A'); setToEdit(null); }}>
                                        <i className="fas fa-plus me-2"></i>Agregar Materia
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                        {/* El resto del componente no necesita cambios... */}
                        {loading ? <p>Cargando...</p> : <PlanTable planes={filteredPlanes} handleDelete={handleDelete} handleToEdit={handleToEdit} />}
                        {/* ... */}
                    </div>
                </div>
            )}

            {(accion === 'A' || accion === 'M') && (
                <PlanForm onSave={async () => { setAccion('C'); await fetchPlanes(); }} onCancel={() => setAccion('C')} planToEdit={toEdit} />
            )}
        </>
    );
}
export default PlanPage;