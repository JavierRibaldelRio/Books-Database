import BookForm from "../components/BookForm";
import MostrarLibros from "../components/MostrarLibros";

import React, { Component } from 'react';
import BusquedaForm from "./BusquedaForm";


class Busqueda extends Component {
    constructor(props) {
        super(props);

        this.query = this.query.bind(this);


        this.state = { query: null, data: null };
    }

    query(query) {

        this.setState({ query: query });

    }


    //Hace el fetch después de cada cambio de estado
    componentDidUpdate() {

        // Obitiene los criterios
        let query = this.state.query;

        // Elimina los strings que solo sontexto en blanco
        for (let s in query) {
            if (query[s] === '') {
                delete query[s];
            }
        }


        // fetch('/query', 						//La url del sevidor
        //     {
        //         method: 'POST',							//Utiliza el metodo post
        //         body: JSON.stringify(query),		//Elige que información mandar
        //         headers: { 'Content-Type': 'application/json' }		//Informa de que la información es un json
        //     }).then(response => response.json())
        //     .then(data => this.setState({ data: data }));		//Muestra los datos
    }



    render() {
        return (<>
            <BusquedaForm setQuery={this.query} />

        </>);
    }
}

export default Busqueda;