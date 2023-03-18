import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../style/colecciones_interfaz.css';

import Coleccion from './interfazColecciones/Coleccion';


class InterfazColecciones extends Component {
    constructor(props) {
        super(props);

        this.state = { data: [], numeroColecciones: 0 }
    }

    componentDidMount() {
        fetch("/api/collection/fetch-colecciones").then(res => res.json()).then((data) => { this.setState({ data: data, numeroColecciones: data.length }) }).catch((err) => console.log('ERROR: ' + err));
    }

    render() {


        let colecciones = null

        if (this.state.numeroColecciones !== 0) {

            colecciones = this.state.data.map((coleccion) => <Coleccion coleccion={coleccion} />)
        }
        else {
            colecciones = <Alert key={"warning"} variant="warning">Todavía no se ha creado ninguna coleccion o no se puede establecer conesxión con la Base de Datos</Alert>
        }

        return <>

            <div id='panel-colecciones'>
                {/* Coleccion */}
                <li> Numero colecciones: <strong>{this.state.numeroColecciones}</strong> </li>

                {/* Boton que te manda a crear una nueva colecicones */}
                <a href="/colecciones/crear-coleccion" className='btn btn-primary' role={"button"}>Crear Nueva Coleccion &nbsp;<FontAwesomeIcon icon={faPlus} /></a>


            </div>


            <div id='mostrar-colecciones'>{colecciones}</div>
        </>;
    }
}

export default InterfazColecciones;