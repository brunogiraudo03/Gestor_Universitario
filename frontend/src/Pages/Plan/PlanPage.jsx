// src/pages/Plan/PlanPage.jsx

import React, { useState, useEffect } from 'react'; // Importamos useEffect
import { useForm } from 'react-hook-form';
import planesService from '../../services/plan.services'; // Ajusta la ruta si es necesario
import PlanTable from './PlanTable';
import PlanForm from './PlanForm';
import './PlanPage.css';

function PlanPage({ planes, loading, fetchPlanes }) {
    const { register, handleSubmit, reset } = useForm();
    const [toEdit, setToEdit] = useState(null);
    const [accion, setAccion] = useState('C');
    
    // 1. NUEVO ESTADO: para guardar la lista de planes filtrados
    const [filteredPlanes, setFilteredPlanes] = useState([]);

    // 2. NUEVO useEffect: Sincroniza nuestra lista filtrada con la lista original
    // que viene de App.jsx. Esto asegura que siempre estemos al día.
    useEffect(() => {
        setFilteredPlanes(planes);
    }, [planes]);

    // 3. LÓGICA DE BÚSQUEDA CORREGIDA
    const onSubmitSearch = (data) => {
        const searchTerm = data.search.trim().toLowerCase();
        
        if (!searchTerm) {
            // Si la búsqueda está vacía, mostramos todos los planes
            setFilteredPlanes(planes);
        } else {
            // Filtramos el array de planes original
            const result = planes.filter(plan => 
                plan.nombre.toLowerCase().includes(searchTerm)
            );
            setFilteredPlanes(result);
        }
    };

    // Función para limpiar la búsqueda y mostrar todo de nuevo
    const handleClearSearch = () => {
        setFilteredPlanes(planes);
        reset(); // Limpia el campo de texto del formulario
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
                // CAMBIO: Añadimos la clase 'plan-container-card'
                <div className="card shadow-sm plan-container-card">
                    {/* El card-header ahora lo controla el CSS */}
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