import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';


// FontAwosome
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Hoja css
import '../style/colecciones_interfaz.css';

import Coleccion from './interfazColecciones/Coleccion';
import AlertaCerrable from './AlertaCerrable';

import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import Alerta from '../classes/Alerta';

// Contenido de la página que muestra todas las colecciones
class InterfazColecciones extends Component {
    constructor(props) {
        super(props);

        this.state = { data: [], numeroColecciones: 0, alerta: this.props.alerta }

        // Funciones

        this.modificarAlerta = this.modificarAlerta.bind(this);

        this.ocultarAlerta = this.ocultarAlerta.bind(this);
    }

    // Obtiene los datos de las colecciones
    fetchColecciones() {

        fetch("/api/collection/fetch-colecciones").then(res => res.json()).then((data) => { this.setState({ data: data, numeroColecciones: data.length }) }).catch((err) => console.log('ERROR: ' + err));
    }

    // Obtiene todas las colecciones
    componentDidMount() {

        this.fetchColecciones();
    }

    // Obtine el contenido y el tipo de la alerta y la muestra
    modificarAlerta(contenido_alerta) {

        // Activa la visivilidad de la alerta y concatena el contenido de la alerta
        this.setState({ alerta: { oculta: false, ...contenido_alerta } })

        this.fetchColecciones();

    }

    // Oculta la alerta

    ocultarAlerta() {

        this.setState({ alerta: { oculta: true } })
    }

    render() {

        //Traducciones
        const { t } = this.props;

        let colecciones;

        // Comprueva que colcciones hay que mostrar
        if (this.state.numeroColecciones !== 0) {

            // Almacena todas las colecciones que va mostrar
            colecciones = this.state.data.map((coleccion) => <Coleccion coleccion={coleccion} key={coleccion.coleccion_id} alertar={this.modificarAlerta} />);
        }
        else {

            // Si no hay colecciones avisa que necesita tener conexión o que todacía nos ha creado ninguna
            colecciones = <AlertaCerrable alerta={new Alerta(true, t('no-col-aun'), 'danger')} tipo="warning" texto="Todavía no se ha creado ninguna coleccion o no se puede establecer conexión con la Base de Datos" />;
        }

        return <>

            <div hidden={this.state.alerta.oculta} >
                <Alert key={this.state.alerta.tipo} variant={this.state.alerta.tipo} dismissible onClose={this.ocultarAlerta}>{this.state.alerta.texto}</Alert>
            </div>
            <div id='panel-colecciones'>

                {/* Muestra el número de colecciones */}
                <li> {t("colecciones")}: <strong>{this.state.numeroColecciones.toLocaleString()}</strong> </li>

                {/* Boton que te manda a crear una nueva colecicones */}
                <Link to="/colecciones/crear-coleccion" className='btn btn-primary' role={"button"}>{t("crear-nueva-coleccion")} &nbsp;<FontAwesomeIcon icon={faPlus} /></Link>

            </div>

            {/* Muestra las colecicones */}
            <div id='mostrar-colecciones'>{colecciones}</div>
        </>;
    }
}


InterfazColecciones.defaultProps = {

    alerta: { tipo: 'primary', texto: '', oculta: true }
}

export default withTranslation()(InterfazColecciones)