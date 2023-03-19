import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

//Crea una alerta que se pude cerrar
function AlertaCerrable(props) {

    // Crea un estado
    let [mostrar, setMostrar] = useState(true);
    // Obtone las propiedades
    const { tipo, texto } = props;
    // Devulve la alerta
    return <Alert key={tipo} variant={tipo} show={mostrar} dismissible onClose={() => setMostrar(false)}>

        {texto}
    </Alert>;


}

// Crea las propiedades por defecto
AlertaCerrable.defaultProps = {


    tipo: 'primary',

    texto: ""
};


export default AlertaCerrable;


