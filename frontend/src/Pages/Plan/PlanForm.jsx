import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import planesService from '../../services/plan.services';

function PlanForm({ onSave, onCancel, planToEdit }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const yearOptions = Array.from({ length: 5 }, (_, i) => i + 1);

    const notaOptions = Array.from({ length: 10 }, (_, i) => i + 1);

    useEffect(() => {
        if (planToEdit) {
            setValue('nro_materia', planToEdit.nro_materia);
            setValue('año', planToEdit.año);
            setValue('nombre', planToEdit.nombre);
            setValue('modalidad', planToEdit.modalidad || '');
            setValue('regulares', planToEdit.regulares);
            setValue('aprobadas', planToEdit.aprobadas);
            setValue('carga_horaria', planToEdit.carga_horaria);
            setValue('nota', planToEdit.nota);
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
                nota: data.nota === '' ? null : data.nota 
            };

            if (planToEdit) {
                const response = await planesService.actualizarPlan(dataToSend.nro_materia, dataToSend);
                if (response) {
                    alert('Plan de estudio actualizado correctamente!');
                    await onSave();
                }
            } else {
                const response = await planesService.crearPlan(dataToSend);
                if (response) {
                    alert('Plan de estudio creado correctamente!');
                    await onSave();
                } else {
                    console.error('Error al crear el plan: La respuesta fue nula o indefinida.');
                    alert('Error al crear el plan. La respuesta del servidor no fue la esperada.');
                }
            }
        } catch (error) {
            console.error('Error al guardar el plan:', error);
            if (error.response && error.response.data && error.response.data.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('Ocurrió un error al guardar el plan. Por favor, intente de nuevo.');
            }
        }
    };

    return (
        <div className="card my-4 plan-form-card">
            <div className="card-header bg-danger text-white"> 
                <h3 className="mb-0">{planToEdit ? 'Modificar Materia' : 'Agregar Nueva Materia'}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nro_materia" className="form-label">Número de Materia</label>
                            <input
                            type="number"
                            className={`form-control ${errors.nro_materia ? 'is-invalid' : ''}`}
                            id="nro_materia"
                            {...register('nro_materia', {
                                required: 'El número de materia es requerido',
                                min: { value: 1, message: 'Debe ser un número positivo' },
                                valueAsNumber: true
                            })}
                            readOnly={!!planToEdit}  
                          />
                            {errors.nro_materia && <div className="invalid-feedback">{errors.nro_materia.message}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="año" className="form-label">Año</label>
                            <select
                                className={`form-select ${errors.año ? 'is-invalid' : ''}`}
                                id="año"
                                {...register('año', {
                                    required: 'El año es requerido',
                                    valueAsNumber: true, 
                                    validate: value => value !== '' || 'Seleccione un año válido'
                                })}
                            >
                                <option value="">Seleccione el Año</option>
                                {yearOptions.map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            {errors.año && <div className="invalid-feedback">{errors.año.message}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre de Materia</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            id="nombre"
                            {...register('nombre', {
                                required: 'El nombre de la materia es requerido',
                                minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                                maxLength: { value: 100, message: 'Máximo 100 caracteres' }
                            })}
                        />
                        {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="modalidad" className="form-label">Modalidad</label>
                        <select
                            className={`form-select ${errors.modalidad ? 'is-invalid' : ''}`}
                            id="modalidad"
                            {...register('modalidad', {
                                required: 'La modalidad es requerida',
                                validate: value => value !== '' || 'Seleccione una modalidad válida'
                            })}
                        >
                            <option value="">Seleccione una modalidad</option>
                            <option value="Anual">Anual</option>
                            <option value="1er Cuatrimestre">1er Cuatrimestre</option>
                            <option value="2do Cuatrimestre">2do Cuatrimestre</option>
                        </select>
                        {errors.modalidad && <div className="invalid-feedback">{errors.modalidad.message}</div>}
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="regulares" className="form-label">Correlativas Regulares</label>
                            <input
                                type="text"
                                className="form-control"
                                id="regulares"
                                {...register('regulares')}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="aprobadas" className="form-label">Correlativas Aprobadas</label>
                            <input
                                type="text"
                                className="form-control"
                                id="aprobadas"
                                {...register('aprobadas')}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="carga_horaria" className="form-label">Carga Horaria</label>
                            <input
                                type="number"
                                className={`form-control ${errors.carga_horaria ? 'is-invalid' : ''}`}
                                id="carga_horaria"
                                {...register('carga_horaria', {
                                    required: 'La carga horaria es requerida',
                                    min: { value: 1, message: 'Debe ser al menos 1 hora' },
                                    max: { value: 500, message: 'Carga horaria excesiva' },
                                    valueAsNumber: true
                                })}
                            />
                            {errors.carga_horaria && <div className="invalid-feedback">{errors.carga_horaria.message}</div>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="nota" className="form-label">Nota (Opcional)</label>
                            <select
                                id="nota"
                                className={`form-select ${errors.nota ? 'is-invalid' : ''}`}
                                {...register('nota', {
                                    validate: value => {
                                        if (value === null || value === undefined || value === '') {
                                            return true;
                                        }
                                        const numericValue = Number(value);
                                        return (numericValue >= 1 && numericValue <= 10) || 'La nota debe ser entre 1 y 10';
                                    }
                                })}
                            >
                                <option value="">-- Sin Nota --</option>
                                {notaOptions.map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            {errors.nota && <div className="invalid-feedback">{errors.nota.message}</div>}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                            <i className="fas fa-times-circle me-2"></i>Cancelar
                        </button>
                        <button type="submit" className="btn btn-danger">
                            <i className="fas fa-save me-2"></i>{planToEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PlanForm;