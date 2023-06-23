import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Alerta from '../classes/Alerta';

//Crea una alerta que se pude cerrar
function AlertaCerrable(props) {

    // Crea un estado
    let [mostrar, setMostrar] = useState(props.alerta.mostrar);
    // Obtone las propiedades
    const { tipo, texto } = props.alerta;
    // Devulve la alerta
    return <Alert className='alerta-cerrable' key={tipo} variant={tipo} show={mostrar} dismissible onClose={() => setMostrar(false)}>

        {texto}
    </Alert>;


}

// Crea las propiedades por defecto
AlertaCerrable.defaultProps = {

    alerta: new Alerta()
};


export default AlertaCerrable;


