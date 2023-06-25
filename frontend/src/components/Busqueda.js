import MostrarLibros from "../components/MostrarLibros";

import React, { Component } from 'react';
import BusquedaForm from "./BusquedaForm";

import { withTranslation } from "react-i18next";


class Busqueda extends Component {
    constructor(props) {
        super(props);

        this.query = this.query.bind(this);
        this.state = {};

    }

    // Comprueba si hay algún libro que buscar
    componentDidMount() {
        if (this.props.libroABuscar !== '') {

            this.query({ titulo: this.props.libroABuscar, idioma: "", autor: "" });
        }
    }

    // Busca que libros cumplen las nuevas condiciones introducidas en el formulario
    query(q) {

        fetch('/api/query',
            {
                method: 'POST',
                body: JSON.stringify(q),
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json())
            .then(data => this.setState({ data: data }));
    }



    render() {

        const { t } = this.props


        return (<>
            {/* Formulario que obtiene los parámetros de búsqueda */}
            <BusquedaForm setQuery={this.query} tituloLibro={this.props.libroABuscar} />

            {/* Muestra los resultados del fetch, si no hay ningún parámetro mostrará todos los libros, si hay un libro que buscamos desde la cabecera que no existe decimos que no hay nada, si no hay nada especificado en el formulario lo muestra todo */}

            <MostrarLibros query={this.state.data} mensajeError={t("libro-no-caracteristicas")} />

        </>);
    }
}


export default withTranslation()(Busqueda);