import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import ordenarArrayObjeto from '../scripts/ordenarArrayObjeto';
import FilaLibros from './FilaLibros';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import crearData from '../scripts/CrearDatosTabla';
import { faSort } from '@fortawesome/free-solid-svg-icons'
import AlertaCerrable from './AlertaCerrable';



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

            //Obtiene los libros
            fetch('/api/fetch_books').then((res) => res.json())
                .then((data) => this.setState({
                    data: data.map(crearData)
                }))
                .catch((err) => console.log('err :>> ', err));

        }

    }

    componentDidUpdate(preProv) {
        if (this.props.query !== null && JSON.stringify(this.props.query) !== JSON.stringify(preProv.query)) {

            this.setState({ data: this.props.query.map(crearData) });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {


        if (JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {

            return false;
        }

        return true;
    }


    // Formatea las fechas

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


    // Aplica la función ordenar a acada uno de lodds criterios
    ordenarID() { this.ordenar('libro_id'); }
    ordenarTitulo() { this.ordenar('titulo'); }
    ordenarAutor() { this.ordenar('autor'); }
    ordenarIdioma() { this.ordenar('idioma'); }
    ordenarFechaInicio() { this.ordenar('fecha_inicio_date', true); }
    ordenarFechaFinalizacion() { this.ordenar('fecha_finalizacion_date', true); }

    render() {

        const filas = this.state.data.map((x) => <FilaLibros libro={x} key={x.libro_id} />);

        // Si hay algo que mostrar
        if (filas.length !== 0) {
            return <>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th className='puntero' onClick={this.ordenarID}>ID <FontAwesomeIcon icon={faSort} /></th>
                            <th className='puntero' onClick={this.ordenarTitulo}>TÍTULO <FontAwesomeIcon icon={faSort} /></th>
                            <th className='puntero' onClick={this.ordenarAutor} >AUTOR <FontAwesomeIcon icon={faSort} /></th>
                            <th className='puntero' onClick={this.ordenarIdioma}>IDIOMA <FontAwesomeIcon icon={faSort} /></th>
                            <th className='puntero' onClick={this.ordenarFechaInicio}>FECHA INCIO <FontAwesomeIcon icon={faSort} /></th>
                            <th className='puntero' onClick={this.ordenarFechaFinalizacion}>FECHA FINALIZACIÓN <FontAwesomeIcon icon={faSort} /></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filas}
                    </tbody>
                </Table>
            </>;
        }

        //Si no hay nada que mostrar

        else {

            return <AlertaCerrable tipo="danger" texto="No se ha podido establecer conexión con las Base de Datos" />
        }
    }
}


MostrarLibros.defaultProps = {

    query: null
}

export default MostrarLibros;