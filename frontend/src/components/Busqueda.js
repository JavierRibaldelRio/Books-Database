import BookForm from "../components/BookForm";
import MostrarLibros from "../components/MostrarLibros";

import React, { Component } from 'react';
import BusquedaForm from "./BusquedaForm";


class Busqueda extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>
            <BusquedaForm />

        </>);
    }
}

export default Busqueda;