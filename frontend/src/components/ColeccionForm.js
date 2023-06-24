import React, { Component } from 'react';
import TextField from './formcomponents/TextField'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import randomHex from '../scripts/randomHex'

import { withTranslation } from 'react-i18next';


//Importa el css del formulario

import '../style/coleccion_form.css';
import Alerta from '../classes/Alerta';

// Crea el formulario de la coleccion
class ColeccionForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false, nombre: undefined, hex: this.props.coleccion.color || randomHex() }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeNombre = this.handleChangeNombre.bind(this);

        this.cambiarColor = this.cambiarColor.bind(this);

        this.handleChangeColor = this.handleChangeColor.bind(this);
    }

    // Modifica el valor del input por el nuevo color
    handleChangeColor(e) {

        let v = e.target.value;
        this.setState({ hex: v })
    }

    handleChangeNombre(e) {

        this.setState({ nombre: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (e.currentTarget.checkValidity() === false) {

            e.stopPropagation();

        } else {

            const { t } = this.props;

            // Hace la petición al servidor
            fetch(this.props.ruta,
                {
                    method: "POST",
                    body: JSON.stringify({ coleccion_id: this.props.coleccion.coleccion_id, nombre: this.state.nombre, color: this.state.hex }),
                    headers: { 'Content-Type': 'application/json' }

                })

                // Redirecciona y genera a la alerta correspondiente

                .then(response => {

                    let alerta = {};

                    if (response.status === 200) {
                        alerta = new Alerta(true, pasarAMayusFrase(this.state.nombre) + " " + t('coleccion-guardada'), "success")
                    }
                    else {
                        alerta = new Alerta(true, pasarAMayusFrase(this.state.nombre) + " " + t('no-guardar-col'), "danger")

                    }

                    this.props.navigate('/colecciones', { state: alerta })
                })
                .catch(e => console.log('e :>> ', e));
        }



        this.setState({ validate: true });


    }

    cambiarColor(e) {
        e.preventDefault();
        this.setState({ hex: randomHex() })
    }


    render() {

        // Traducciones
        const { t } = this.props

        // Almacena colección y colores
        const et = this.props.coleccion;
        const col = this.state.hex;


        return (<Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit}>

            <div id='coleccion-form'>
                <TextField name='nombre' md={"3"} label={t("nombre")} required='true' value={pasarAMayusFrase(et.nombre)} onChange={this.handleChangeNombre} />
                <label id="color-picker" htmlFor="color">
                    {t("color")}:

                    <div id='control-color-picker'>
                        <input id="color" type="color" onChange={this.handleChangeColor} name="color" value={col} />

                        <button onClick={this.cambiarColor} className='btn btn-dark'>
                            {t('color-aleatorio')} &nbsp;<FontAwesomeIcon icon={faShuffle} />
                        </button>

                    </div>
                </label>
            </div>

            <button type='submit' className='btn btn-primary'>{this.props.texto} &nbsp;<FontAwesomeIcon icon={this.props.ico} /></button>
        </Form>);
    }
}


ColeccionForm.defaultProps = {

    coleccion: {}
}

export default withTranslation()(ColeccionForm);
