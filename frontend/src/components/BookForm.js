import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import DateField from './formcomponents/DateField'
import TextField from './formcomponents/TextField'

import React, { Component } from 'react';


class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false, }
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

        fetch('/api/fetch_autores_idiomas').then((res) => res.json()).then((data) => { this.setState({ autores: data.autores, idiomas: data.idiomas }) }).catch((err) => console.log('ERROR: ' + err));
    }

    render() {

        const x = this.props.libro;

        return (

            <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action="/api/add-book" method='post'>
                <Row className="mb-3">

                    <TextField name='titulo' label='Título' required='true' value={x.titulo} />

                    <TextField name='idioma' label='Idioma' list={this.state.idiomas || undefined} value={x.idioma} />

                    <TextField name='autor' label="Autor" list={this.state.autores || undefined} required="true" value={x.autor} />
                </Row>
                <Row className="mb-3">

                    <DateField name='fechaI' label="Fecha de Inicio" value={x.fechaI} />
                    <DateField name='fechaF' label="Fecha de Finalización" value={x.fechaF} />
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>

        );
    }
}

BookForm.defaultProps = {
    libro: {}
}

export default BookForm;