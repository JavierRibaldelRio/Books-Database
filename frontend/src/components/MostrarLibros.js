import React, { Component } from 'react';

import Table from 'react-bootstrap/Table';
import FilaLibros from './FilaLibros';

class MostrarLibros extends Component {
    constructor(props) {
        super(props);

        this.state = { data: [] };

        this.ordenarID = this.ordenarID.bind(this);
    }

    componentDidMount() {

        if (this.props.query === null) {

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


    render() {

        const filas = this.state.data.map((x) => <FilaLibros libro={x} key={x.libro_id} />);

        return <>
            <Table striped responsive>
                <thead>
                    <th onClick={this.ordenarID}>ID</th>
                    <th >TÍTULO</th>
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