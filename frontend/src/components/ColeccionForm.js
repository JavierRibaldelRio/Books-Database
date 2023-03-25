import React, { Component } from 'react';
import TextField from './formcomponents/TextField'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import randomHex from '../scripts/randomHex'


//Importa el css del formulario

import '../style/coleccion_form.css';

// Crea el formulario de la coleccion
class ColeccionForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false, hex: this.props.coleccion.color || randomHex() }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.cambiarColor = this.cambiarColor.bind(this);

        this.handleChange = this.handleChange.bind(this)
    }

    // Modifica el valor del input por el nuevo color
    handleChange(e) {

        let v = e.target.value;
        this.setState({ hex: v })
    }

    handleSubmit(e) {

        if (e.currentTarget.checkValidity() === false) {

            e.preventDefault();

            e.stopPropagation();
        }

        this.setState({ validate: true })

    }

    cambiarColor(e) {
        e.preventDefault();
        this.setState({ hex: randomHex() })
    }



    render() {

        const et = this.props.coleccion;

        const col = this.state.hex;


        return (<Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action={this.props.ruta} method='post'>

            <input type={'number'} name="coleccion_id" value={et.coleccion_id} hidden readOnly />
            <div id='coleccion-form'>
                <TextField name='nombre' md={"3"} label='Nombre' required='true' value={pasarAMayusFrase(et.nombre)} />
                <label id="color-picker" htmlFor="color">
                    Color:

                    <div id='control-color-picker'>
                        <input id="color" type="color" onChange={this.handleChange} name="color" value={col} />

                        <button onClick={this.cambiarColor} className='btn btn-dark'>
                            Color Aleatorio &nbsp;<FontAwesomeIcon icon={faShuffle} />
                        </button>

                    </div>
                </label>
            </div>

            <button type='submit' className='btn btn-primary'>{this.props.texto} &nbsp;<FontAwesomeIcon icon={this.props.ico} /></button>
        </Form>);
    }
}

export default ColeccionForm;

ColeccionForm.defaultProps = {

    coleccion: {}
}