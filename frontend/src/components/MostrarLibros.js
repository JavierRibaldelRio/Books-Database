import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import ordenarArrayObjeto from '../scripts/ordenarArrayObjeto';
import FilaLibros from './FilaLibros';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSort } from '@fortawesome/free-solid-svg-icons'

import json from '../test.json'



class MostrarLibros extends Component {
    constructor(props) {
        super(props);

        //En reverse se almacena si en el siguiente filtro hay que invertir el búcle
        this.state = { data: [], reverse: { libro_id: true, titulo: false, idioma: false, fecha_finalizacion: false, fecha_inicio: false } };

        this.ordenarID = this.ordenarID.bind(this);
        this.ordenarAutor = this.ordenarAutor.bind(this);
        this.ordenarTitulo = this.ordenarTitulo.bind(this);
        this.ordenarIdioma = this.ordenarIdioma.bind(this);
        this.ordenarFechaInicio = this.ordenarFechaInicio.bind(this);
        this.ordenarFechaFinalizacion = this.ordenarFechaFinalizacion.bind(this);
    }

    componentDidMount() {

        if (this.props.query === null) {

            this.setState({
                data: json.map

            //Obtiene los libros
            // fetch('').then((res) => res.json())
            //     .then((data) => this.setState({
            /*         data: data.map*/((x) => {

                    var mirarSiHayFecha = (s, fe) => typeof s[fe] === 'string' && s[fe] !== '';

                    var y = x;

                    if (mirarSiHayFecha(y, 'fecha_finalizacion')) {
                        y.fecha_finalizacion_date = new Date(x.fecha_finalizacion);
                    } else {
                        y.fecha_finalizacion = null;
                    }

                    if (mirarSiHayFecha(y, 'fecha_inicio')) {

                        y.fecha_inicio_date = new Date(x.fecha_inicio);
                    }

                    else {

                        y.fecha_inicio = null;
                    }
                    return y;
                })
            });
            //     }))
            //     .catch((err) => console.log('err :>> ', err));

        }
        else {
            //Por hacer

        }
    }

    //Ordena segun el criterio especificado

    ordenar(criterio, fecha = false) {

        const invertir = this.state.reverse[criterio];

        var data = this.state.data;

        if (fecha === false) {
            ordenarArrayObjeto(data, criterio);
        }

        else {
            data.sort((a, b) => {
                if (a[criterio] === undefined) {
                    return -1;
                }

                if (b[criterio] === undefined) {
                    return 1;
                }
                console.log('a :>> ', a);
                return a[criterio].getTime() - b[criterio].getTime()
            });
        }

        if (invertir === true) {
            data.reverse();
        }

        this.setState({ reverse: { [criterio]: !invertir }, data: data });
    }


    // Aplica la función ordenar a acada uno de los criterios
    ordenarID() { this.ordenar('libro_id'); }
    ordenarTitulo() { this.ordenar('titulo'); }
    ordenarAutor() { this.ordenar('autor'); }
    ordenarIdioma() { this.ordenar('idioma'); }
    ordenarFechaInicio() { this.ordenar('fecha_inicio_date', true); }
    ordenarFechaFinalizacion() { this.ordenar('fecha_finalizacion_date', true); }

    render() {

        const filas = this.state.data.map((x) => <FilaLibros libro={x} key={x.libro_id} />);

        return <>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th onClick={this.ordenarID}>ID <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={this.ordenarTitulo}>TÍTULO <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={this.ordenarAutor} >AUTOR <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={this.ordenarIdioma}>IDIOMA <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={this.ordenarFechaInicio}>FECHA INCIO <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={this.ordenarFechaFinalizacion}>FECHA FINALIZACIÓN <FontAwesomeIcon icon={faSort} /></th>
                    </tr>
                </thead>

                <tbody>
                    {filas}
                </tbody>
            </Table>
        </>;
    }
}


MostrarLibros.defaultProps = {

    query: null
}

export default MostrarLibros;