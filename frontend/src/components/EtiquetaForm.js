import React, { Component } from 'react';
import TextField from './formcomponents/TextField'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { pasarAMayusFrase } from '../scripts/pasarAMayus';

// Crea el formulario de la etiqueta
class EtiquetaForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {



    }
    render() {

        const et = this.props.etiqueta

        return (<Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action={this.props.ruta} method='post'>
            <div id='etiqueta-form'>
                <TextField name='nombre' label='Nombre' required='true' value={pasarAMayusFrase(et.nombre)} />

                <input type="color" name="color" />
            </div>


        </Form>);
    }
}

export default EtiquetaForm;

EtiquetaForm.defaultProps = {

    etiqueta: {}
}