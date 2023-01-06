// Hace una llamada a la API  y mustra los resultados

import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import esFecha from '../scripts/esFecha';
import pasarAMayusPalabra, { pasarAMayusFrase } from '../scripts/pasarAMayus';
import Titulo from './Titulo';

class Mostrar extends Component {
    constructor(props) {
        super(props);

        this.state = { data: null }
    }
    componentDidMount() {

        fetch(`/api/fetch-book/${this.props.id}`).then(res => res.json()).then(data => this.setState({ data: data })).catch((err) => console.log('err :>> ', err));
    }
    render() {

        if (this.state.data === null) {

            return <Alert key='danger' variant='danger'>
                No se ha podido establer conexión con la base de datos
            </Alert>

        } else {

            let { autor, titulo, idioma, libro_id, fecha_finalizacion, fecha_inicio } = this.state.data;

            titulo = pasarAMayusFrase(titulo);
            idioma = pasarAMayusPalabra(idioma);
            autor = pasarAMayusFrase(autor);

            let dias = undefined;

            if (esFecha(fecha_inicio) && esFecha(fecha_finalizacion)) {



            }



            return <><Titulo text={titulo} />

                <table>
                    <tbody>
                        <tr> <th>ID:</th>

                            <td>{this.props.id}</td>
                        </tr>

                        <tr> <th>Autor:</th>

                            <td>{autor}</td>
                        </tr>
                        <tr> <th>Idioma:</th>

                            <td>{idioma}</td>
                        </tr>

                        <tr> <th>Fecha Inicio:</th>

                            <td>{fecha_inicio || "No especificada"}</td>
                        </tr>
                        <tr> <th>Fecha Finalización: </th>

                            <td>{fecha_finalizacion || "No especificada"}</td>
                        </tr>
                        <tr> <th>Días de Lectura:</th>

                            <td>{autor}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        }
    }
}

export default Mostrar;