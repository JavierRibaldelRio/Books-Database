import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import DateField from './formcomponents/DateField'
import TextField from './formcomponents/TextField'
import Alerta from '../classes/Alerta';

import React, { Component } from 'react';
import ColecionesList from './formcomponents/ColeccionesList';

// Importa el objeto de la traducción
import { withTranslation } from 'react-i18next';


class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = { validate: false, libro: this.props.libro || { titulo: '', idioma: '', autor: '', fecha_inicio: '', fecha_finalizacion: '', colecciones: [] } }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeLibro = this.handleChangeLibro.bind(this);
        this.handelChangeColecciones = this.handelChangeColecciones.bind(this);
    }

    //Se ejecuta al enviar el fórmulario
    handleSubmit(e) {

        // Traducción
        const { t } = this.props;



        e.preventDefault();


        //Comprueba que todo esta bien, si esta mal detiene el formulario
        if (e.currentTarget.checkValidity() === false) {


            e.stopPropagation();
        } else {


            fetch(this.props.ruta, {

                method: "POST",
                body: JSON.stringify(this.state.libro),
                headers: { 'Content-Type': 'application/json' }

            }).then(response => {


                this.setState({ libro: { titulo: '', idioma: '', autor: '', fecha_inicio: '', fecha_finalizacion: '', colecciones: [] } })

                let alerta;

                const titulo = pasarAMayusFrase(this.state.libro.titulo);

                if (response.status === 200) {
                    alerta = new Alerta(true, titulo + " " + t('coleccion-guardada'), "success")

                }
                else {
                    alerta = new Alerta(true, titulo + " " + t('no-guardar-col'), "danger")

                }

                this.props.navigate('/', { state: alerta })
            })
                .catch(e => console.log('e :>> ', e));
        }

        this.setState({ validate: true })

    }

    componentDidMount() {

        fetch('/api/fetch-autores-idiomas-colecciones').then((res) => res.json()).then((data) => { this.setState({ autores: data.autores, idiomas: data.idiomas, colecciones: data.colecciones }) }).catch((err) => console.log('ERROR: ' + err));

    }


    // Genera una nueva propiedad que corresponde al nombre del input, y le asigna de valor el valor del input
    handleChangeLibro(e) {

        // Almacena el  libro actual
        const libro = this.state.libro;

        // Añade al libro en la propieda el valor del input
        libro[e.target.name] = e.target.value;

        this.setState({ libro: libro });
    }


    // Añade o elimina la colecciona al estado
    handelChangeColecciones(e) {

        // Selecciona el libro

        const libro = this.state.libro;

        // Colección a añadir o eliminar
        const col = e.target.value;

        // Si la colección esta marcada la desmarca
        if (libro.colecciones.includes(col)) {

            libro.colecciones = libro.colecciones.filter(c => c != col);    //Elimina la colecciónd el array utilizando un filtro por id distinta de la actual
        }
        else {
            libro.colecciones.push(col);
        }

        this.setState({ libro: libro });
    }
    render() {

        const libro = this.state.libro;

        //Almacena la traducción

        const { t } = this.props;



        return (

            <Form noValidate validated={this.state.validate} onSubmit={this.handleSubmit} action={this.props.ruta} method='post' id='myForm'>
                <Row className="mb-3">

                    <TextField name='titulo' label={t('titulo')} required='true' value={pasarAMayusFrase(libro.titulo)} onChange={this.handleChangeLibro} />

                    <TextField name='idioma' label={t('idioma')} list={this.state.idiomas || undefined} value={pasarAMayusFrase(libro.idioma)} onChange={this.handleChangeLibro} />

                    <TextField name='autor' label={t("autor")} list={this.state.autores || undefined} required="true" value={pasarAMayusFrase(libro.autor)} onChange={this.handleChangeLibro} />
                </Row>
                <Row className="mb-3">
                    <DateField name='fecha_inicio' label={t("fecha-de-inicio")} value={libro.fecha_inicio} onChange={this.handleChangeLibro} />

                    <DateField name='fecha_finalizacion' label={t("fecha-de-finalizacion")} value={libro.fecha_finalizacion} onChange={this.handleChangeLibro} />

                    <ColecionesList coleccionesSeleccionadas={libro.colecciones} colecciones={this.state.colecciones || undefined} onChange={this.handelChangeColecciones} />
                </Row>
                <Button type="submit">{this.props.text} &nbsp;<FontAwesomeIcon icon={this.props.ico} /></Button>
            </Form>

        );
    }
}



export default withTranslation()(BookForm);