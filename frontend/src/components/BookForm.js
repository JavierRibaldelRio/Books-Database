import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import DateField from './formcomponents/DateField'
import TextField from './formcomponents/TextField'

import React, { Component } from 'react';
import ColecionesList from './formcomponents/ColeccionesList';


class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Se ejecuta al enviar el fórmulario
    handleSubmit(e) {

        //Comprueba que todo esta bien, si esta mal detiene el formulario
        if (e.currentTarget.checkValidity() === false) {

            e.preventDefault();

            e.stopPropagation();
        }

        this.setState({ validate: true })

    }

    componentDidMount() {

        fetch('/api/fetch-autores-idiomas-colecciones').then((res) => res.json()).then((data) => { this.setState({ autores: data.autores, idiomas: data.idiomas, colecciones: data.colecciones }) }).catch((err) => console.log('ERROR: ' + err));

    }

    render() {

        const x = this.props.libro;

        const inputID = (typeof x.libro_id === 'number') ? <input hidden name='libro_id' readOnly value={x.libro_id} /> : <></>;

        return (

            <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action={this.props.ruta} method='post'>
                <Row className="mb-3">

                    <TextField name='titulo' label='Título' required='true' value={pasarAMayusFrase(x.titulo)} />

                    <TextField name='idioma' label='Idioma' list={this.state.idiomas || undefined} value={pasarAMayusFrase(x.idioma)} />

                    <TextField name='autor' label="Autor" list={this.state.autores || undefined} required="true" value={pasarAMayusFrase(x.autor)} />
                </Row>
                <Row className="mb-3">
                    <DateField name='fecha_inicio' label="Fecha de Inicio" value={x.fecha_inicio} />

                    <DateField name='fecha_finalizacion' label="Fecha de Finalización" value={x.fecha_finalizacion} />

                    <ColecionesList colecciones={this.state.colecciones || undefined} />
                </Row>
                <Button type="submit">{this.props.text} &nbsp;<FontAwesomeIcon icon={this.props.ico} /></Button>

                {inputID}
            </Form>

        );
    }
}

BookForm.defaultProps = {
    libro: {}
}

export default BookForm;