import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import electivaService from '../../services/electiva.services';
import ElectivasTable from './ElectivasTable';
import ElectivasForm from './ElectivasForm';
import '../Plan/PlanPage.css'; 

function ElectivasPage() {
    const [electivas, setElectivas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accion, setAccion] = useState('C'); 
    const [toEdit, setToEdit] = useState(null);
    const [filteredElectivas, setFilteredElectivas] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    const fetchElectivas = async () => {
        try {
            setLoading(true);
            const data = await electivaService.obtenerElectivas();
            setElectivas(data || []);
            setFilteredElectivas(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchElectivas();
    }, []);

    useEffect(() => {
        setFilteredElectivas(electivas);
    }, [electivas]);

    const onSubmitSearch = (data) => {
        const term = data.search.trim().toLowerCase();
        if (!term) {
            setFilteredElectivas(electivas);
        } else {
            setFilteredElectivas(electivas.filter(e => e.nombre.toLowerCase().includes(term)));
        }
    };

    const handleClearSearch = () => {
        setFilteredElectivas(electivas);
        reset();
    };

    const handleDelete = async (id) => {
        if(window.confirm('¿Seguro que quieres borrar esta electiva?')) {
            await electivaService.borrarElectiva(id);
            await fetchElectivas();
        }
    };

    const handleToEdit = (id) => {
        const found = electivas.find(e => e.id === id);
        setToEdit(found);
        setAccion('M');
    };

    return (
        <>
            {accion === 'C' && (
                <div className="card shadow-sm plan-container-card">
                    <div className="card-header">
                        <h5 className="mb-0">Mis Electivas y Créditos</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmitSearch)} className="mb-4">
                            <div className="row g-2">
                                <div className="col-sm">
                                    <input {...register('search')} type="text" className="form-control" placeholder="Buscar electiva..." />
                                </div>
                                <div className="col-sm-auto">
                                    <button type="submit" className="btn btn-search-custom">Buscar</button>
                                </div>
                                <div className="col-sm-auto">
                                    <button type="button" className="btn btn-clear-custom" onClick={handleClearSearch}>Limpiar</button>
                                </div>
                                <div className="col-sm-auto ms-auto">
                                    <button type="button" className="btn btn-danger" onClick={() => { setAccion('A'); setToEdit(null); }}>
                                        <i className="fas fa-plus me-2"></i>Nueva Electiva
                                    </button>
                                </div>
                            </div>
                        </form>

                        {loading ? <p>Cargando...</p> : 
                            <ElectivasTable electivas={filteredElectivas} handleDelete={handleDelete} handleToEdit={handleToEdit} />
                        }
                    </div>
                </div>
            )}

            {(accion === 'A' || accion === 'M') && (
                <ElectivasForm 
                    onSave={async () => { setAccion('C'); await fetchElectivas(); }} 
                    onCancel={() => setAccion('C')} 
                    planToEdit={toEdit} 
                />
            )}
        </>
    );
}

export default ElectivasPage;