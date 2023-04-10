import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import DateField from './formcomponents/DateField'
import TextField from './formcomponents/TextField'

import React, { Component } from 'react';
import ColecionesList from './formcomponents/ColeccionesList';

// Importa el objeto de la traducción
import { withTranslation } from 'react-i18next';


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

        //Almacena la traducción

        const { t } = this.props;

        const inputID = (typeof x.libro_id === 'number') ? <input hidden name='libro_id' readOnly value={x.libro_id} /> : <></>;

        return (

            <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action={this.props.ruta} method='post'>
                <Row className="mb-3">

                    <TextField name='titulo' label={t('titulo')} required='true' value={pasarAMayusFrase(x.titulo)} />

                    <TextField name='idioma' label={t('idioma')} list={this.state.idiomas || undefined} value={pasarAMayusFrase(x.idioma)} />

                    <TextField name='autor' label={t("autor")} list={this.state.autores || undefined} required="true" value={pasarAMayusFrase(x.autor)} />
                </Row>
                <Row className="mb-3">
                    <DateField name='fecha_inicio' label={t("fecha-de-inicio")} value={x.fecha_inicio} />

                    <DateField name='fecha_finalizacion' label={t("fecha-de-finalizacion")} value={x.fecha_finalizacion} />

                    <ColecionesList coleccionesSeleccionadas={x.colecciones} colecciones={this.state.colecciones || undefined} />
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

export default withTranslation()(BookForm);