import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


function AlertaCerrable(props) {

    let [mostrar, setMostrar] = useState(true);

    const { tipo, texto } = props

    return <Alert key={tipo} variant={tipo} show={mostrar} dismissible onClose={() => setMostrar(false)}>

        {texto}
    </Alert>


}


export default AlertaCerrable;


