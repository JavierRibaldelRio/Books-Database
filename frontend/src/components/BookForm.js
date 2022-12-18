import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


import React, { Component } from 'react';


class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //Se ejecuta al enviar el fórmulario
    handleSubmit(e) {

        if (e.currentTarget.checkValidity() === false) {

            e.preventDefault();

            e.stopPropagation();
        }

        this.setState({ validate: true })

    }

    render() {
        return (

            <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action="https://pokemon.com" method='get'>
                {/* Título Autor y Lengua */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="titulo">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            name='titulo'
                            required
                            type="text"
                            placeholder="Titulo del libro"
                        />

                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Idioma</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            list='idiomas'
                            placeholder="Idioma"
                        />

                        <datalist id="idiomas">
                            <option>Volvo</option>
                            <option>Saab</option>
                            <option>Mercedes</option>
                            <option>Audi</option>
                        </datalist>

                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="2" controlId="validationCustom03">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <Form.Control type="date" name="fachaI" />
                        <Form.Control.Feedback type="invalid">
                            Inserte una fecha válida
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="fechaF">
                        <Form.Label>Fecha de Finalización</Form.Label>
                        <Form.Control type="date" name="fachaF" />
                        <Form.Control.Feedback type="invalid">
                            Inserte una fecha válida
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <Button type="submit">Submit form</Button>
            </Form>

        );
    }
}

export default BookForm;