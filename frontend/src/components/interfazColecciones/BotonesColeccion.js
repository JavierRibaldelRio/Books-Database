import React from 'react';




function BotonesColeccion(props) {

    const id = props.id

    return <div className='botones-coleccion' key={"BotonesColeccion" + id}>

        <span className='elipse'>{props.nombre}</span>
        <button className='btn btn-primary'>Ver</button>

        <button className='btn btn-warning'>Editar</button>

        <button className='btn btn-danger'>Eliminar </button>
    </div>
}

export default BotonesColeccion;