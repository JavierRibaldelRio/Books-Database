import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import TextField from './formcomponents/TextField';
import Col from 'react-bootstrap/esm/Col';

class BusquedaForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = { query: {} }
    }

    handleChange(e) {


        // Obtiene el estado actual
        let query = this.state.query;

        // Edita el estado con la nueva propiedad
        query[e.target.name] = e.target.value;

        //Lo manda para hacer una query
        this.props.setQuery(query);

        //Modific ael estado local
        this.setState({ query: query })


    }

    componentDidMount() {
        fetch('/api/fetch_autores_idiomas').then((res) => res.json()).then((data) => { this.setState({ autores: data.autores, idiomas: data.idiomas }) }).catch((err) => console.log('ERROR: ' + err));
    }
    render() {

        let autores, idiomas;

        let opcion = <option></option>;

        try {

            let newOp = x => <option key={x} value={x}>{pasarAMayusFrase(x)}</option>

            autores = this.state.autores.map(newOp);

            idiomas = this.state.idiomas.map(newOp);
        } catch {

            autores = null;

            idiomas = null;
        }
        return <>

            <Row className="mb-3">
                <TextField onChange={this.handleChange} name="titulo" label="Título" />

                <Form.Group as={Col} md="4">
                    <Form.Label>Idioma:</Form.Label>

                    <Form.Select onChange={this.handleChange} name="idioma" aria-label="Default select example">
                        {opcion}
                        {idiomas}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Autor:</Form.Label>

                    <Form.Select onChange={this.handleChange} name="autor" aria-label="Default select example">
                        {opcion}
                        {autores}
                    </Form.Select>
                </Form.Group>
            </Row>
        </>;
    }
}

export default BusquedaForm;