import MostrarLibros from "../components/MostrarLibros";

import React, { Component } from 'react';
import BusquedaForm from "./BusquedaForm";

import { withTranslation } from "react-i18next";


class Busqueda extends Component {
    constructor(props) {
        super(props);

        this.query = this.query.bind(this);


        this.state = { data: null };
    }

    // Busca que libros cumplen las nuevas condiciones introducidas en el formulario
    query(query) {


        fetch('/api/query',
            {
                method: 'POST',
                body: JSON.stringify(query),
                headers: { 'Content-Type': 'application/json' }
            }).then(response => response.json())
            .then(data => this.setState({ data: data }));
    }



    render() {

        const { t } = this.props
        return (<>
            {/* Formulario que obtiene los parámetros de búsqueda */}
            <BusquedaForm setQuery={this.query} />

            {/* Muestra los resultados del fetch, si no hay ningún parámetro mostrará todos los libros */}

            <MostrarLibros query={this.state.data} mensajeError={t("libro-no-caracteristicas")} />

        </>);
    }
}

export default withTranslation()(Busqueda);