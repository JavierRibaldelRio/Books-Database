import React, { Component } from 'react';

// Bootstrap
import Alert from 'react-bootstrap/Alert';

// FontAwosome
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Hoja css
import '../style/colecciones_interfaz.css';

import Coleccion from './interfazColecciones/Coleccion';

// Contenido de la página que muestra todas las colecciones
class InterfazColecciones extends Component {
    constructor(props) {
        super(props);

        this.state = { data: [], numeroColecciones: 0 }
    }

    // Obtiene todas las colecciones
    componentDidMount() {
        fetch("/api/collection/fetch-colecciones").then(res => res.json()).then((data) => { this.setState({ data: data, numeroColecciones: data.length }) }).catch((err) => console.log('ERROR: ' + err));
    }

    render() {


        let colecciones;

        // Comprueva que colcciones hay que mostrar
        if (this.state.numeroColecciones !== 0) {

            // Almacena todas las colecciones que va mostrar
            colecciones = this.state.data.map((coleccion) => <Coleccion coleccion={coleccion} key={coleccion.coleccion_id} />)
        }
        else {

            // Si no hay colecciones avisa que necesita tener conexión o que todacía nos ha creado ninguna
            colecciones = <Alert key={"warning"} variant="warning">Todavía no se ha creado ninguna coleccion o no se puede establecer conesxión con la Base de Datos</Alert>
        }

        return <>

            <div id='panel-colecciones'>

                {/* Muestra el número de colecciones */}
                <li> Numero colecciones: <strong>{this.state.numeroColecciones}</strong> </li>

                {/* Boton que te manda a crear una nueva colecicones */}
                <a href="/colecciones/crear-coleccion" className='btn btn-primary' role={"button"}>Crear Nueva Coleccion &nbsp;<FontAwesomeIcon icon={faPlus} /></a>

            </div>

            {/* Muestra las colecicones */}
            <div id='mostrar-colecciones'>{colecciones}</div>
        </>;
    }
}

export default InterfazColecciones;