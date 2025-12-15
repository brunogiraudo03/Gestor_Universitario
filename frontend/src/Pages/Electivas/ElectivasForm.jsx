import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import electivaService from '../../services/electiva.services';

function ElectivasForm({ onSave, onCancel, planToEdit }) { 
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const yearOptions = Array.from({ length: 5 }, (_, i) => i + 1);
    const notaOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    useEffect(() => {
        if (planToEdit) {
            setValue('id', planToEdit.id);
            setValue('nombre', planToEdit.nombre);
            setValue('creditos', planToEdit.creditos);
            setValue('año', planToEdit.año);
            setValue('modalidad', planToEdit.modalidad || '');
            setValue('carga_horaria', planToEdit.carga_horaria);
            setValue('nota', planToEdit.nota);
            setValue('regulares', planToEdit.regulares);
            setValue('aprobadas', planToEdit.aprobadas);
        } else {
            reset();
            setValue('modalidad', '');
            setValue('año', '');
            setValue('nota', '');
        }
    }, [planToEdit, reset, setValue]);

    const onSubmit = async (data) => {
        try {
            const dataToSend = {
                ...data,
                creditos: Number(data.creditos),
                carga_horaria: Number(data.carga_horaria),
                año: Number(data.año),
                nota: data.nota === '' ? null : Number(data.nota)
            };

            if (planToEdit) {
                await electivaService.actualizarElectiva(planToEdit.id, dataToSend);
                alert('Electiva actualizada correctamente!');
            } else {
                await electivaService.crearElectiva(dataToSend);
                alert('Electiva creada correctamente!');
            }
            await onSave();
        } catch (error) {
            console.error(error);
            alert('Error al guardar la electiva.');
        }
    };

    return (
        <div className="card my-4 plan-form-card">
            <div className="card-header bg-danger text-white"> 
                <h3 className="mb-0">{planToEdit ? 'Modificar Electiva' : 'Nueva Electiva'}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <label className="form-label">Nombre de la Electiva</label>
                        <input type="text" className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            {...register('nombre', { required: 'El nombre es requerido' })} />
                        {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Créditos</label>
                            <input type="number" className={`form-control ${errors.creditos ? 'is-invalid' : ''}`}
                                {...register('creditos', { required: 'Requerido', min: 1 })} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Año Sugerido</label>
                            <select className="form-select" {...register('año', { required: true })}>
                                <option value="">Seleccione...</option>
                                {yearOptions.map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Modalidad</label>
                            <select className="form-select" {...register('modalidad', { required: true })}>
                                <option value="">Seleccione...</option>
                                <option value="Presencial">Anual</option>
                                <option value="Virtual">1er cuatrimestre</option>
                                <option value="Híbrida">2do cuatrimestre</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Carga Horaria</label>
                            <input type="number" className="form-control" {...register('carga_horaria')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nota (Opcional)</label>
                            <select className="form-select" {...register('nota')}>
                                <option value="">-- Sin Nota --</option>
                                {notaOptions.map(num => <option key={num} value={num}>{num}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Regulares</label>
                            <input type="text" className="form-control" {...register('regulares')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Aprobadas</label>
                            <input type="text" className="form-control" {...register('aprobadas')} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancelar</button>
                        <button type="submit" className="btn btn-danger">{planToEdit ? 'Actualizar' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ElectivasForm;