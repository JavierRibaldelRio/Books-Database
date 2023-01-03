import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import FilaLibros from './FilaLibros';

class MostrarLibros extends Component {
    constructor(props) {
        super(props);

        //En reverse se almacena si en el siguiente filtro hay que invertir el búcle
        this.state = { data: [], reverse: { libro_id: true, titulo: false, idioma: false, fecha_finalizacion: false, fecha_inicio: false } };

        this.ordenarID = this.ordenarID.bind(this);
        this.ordenarTitulo = this.ordenarTitulo.bind(this);
    }

    componentDidMount() {

        if (this.props.query === null) {

            //Obtiene los libros
            fetch('/api/fetch_books').then((res) => res.json())
                .then((data) => this.setState({
                    data: data.map((x) => {
                        var y = x;
                        y.fecha_inicio_date = new Date(x.fecha_inicio);
                        y.fecha_finalizacion_date = new Date(x.fecha_finalizacion);

                        return y;
                    })
                }))
                .catch((err) => console.log('err :>> ', err));

        }
        else {
            //Por hacer

        }
    }

    //Ordena por la id
    ordenarID() {

        this.setState({ data: this.state.data.sort((a, b) => a.libro_id - b.libro_id) });

        const invertir = this.state.reverse.libro_id;

        this.setState({ reverse: { libro_id: !this.state.reverse.libro_id }, data: (invertir) ? this.state.data.reverse() : this.state.data });
    }

    ordenarTitulo() {
        this.setState({ data: this.state.data.sort((a, b) => a.titulo - b.titulo) });

        const invertir = this.state.reverse.titulo;

        console.log('"titulo" :>> ', "titulo");
        this.setState({ reverse: { titulo: !this.state.reverse.titulo }, data: (invertir) ? this.state.data.reverse() : this.state.data });
    }


    render() {

        const filas = this.state.data.map((x) => <FilaLibros libro={x} key={x.libro_id} />);

        return <>
            <Table striped responsive>
                <thead>
                    <th onClick={this.ordenarID}>ID</th>
                    <th onClick={this.ordenarTitulo}>TÍTULO</th>
                    <th >AUTOR</th>
                    <th >IDIOMA</th>
                    <th >FECHA INCIO</th>
                    <th >FECHA FINALIZACIÓN</th>
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