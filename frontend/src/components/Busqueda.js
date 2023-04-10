import MostrarLibros from "../components/MostrarLibros";

import React, { Component } from 'react';
import BusquedaForm from "./BusquedaForm";


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
        return (<>
            {/* Formulario que obtiene los parámetros de búsqueda */}
            <BusquedaForm setQuery={this.query} />

            {/* Muestra los resultados del fetch, si no hay ningún parámetro mostrará todos los libros */}

            <MostrarLibros query={this.state.data} mensajeError="No hay ningún libro que tenga estas características" />

        </>);
    }
}

export default Busqueda;