// Hace una llamada a la API  y mustra los resultados

import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';

// Componentes 
import Titulo from './Titulo';
import MostrarDBData from './mostrar/DBData';
import MostrarGoogleData from './mostrar/GoogleData';

// Funciones
import { pasarAMayusFrase } from '../scripts/pasarAMayus';

class Mostrar extends Component {
    constructor(props) {
        super(props);

        this.state = { data: null, gdata: null }
    }
    componentDidMount() {

        fetch(`/api/fetch-book/${this.props.id}`)
            .then(res => res.json())
            .then((data) => {

                fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${data.titulo}"+inauthor:"${data.autor}"&maxResults=1&printType=books`)
                    .then(res => res.json())
                    .then((gdata) => {

                        try {
                            this.setState({ gdata: gdata.items.reverse() });

                        } catch (err) {

                            this.setState({ gdata: null })
                        }
                    })
                    .catch((err) => console.log('err :>> ', err));


                this.setState({ data: data });


            })
            .catch((err) => console.log('err :>> ', err));


    }
    render() {

        if (this.state.data === null) {

            return <Alert key='danger' variant='danger'>
                No se ha podido establer conexión con la base de datos
            </Alert>

        } else {

            let gdata;

            if (this.state.gdata === null) {

                gdata = <Alert key="warning" variant='warning'>No se ha podido encontrar en google books</Alert>

            } else {

                gdata = <MostrarGoogleData data={this.state.gdata[0]} />

            }


            return <><Titulo text={pasarAMayusFrase(this.state.data.titulo)} />
                <div class="modal-body row">
                    <div class="col-md-4">
                        <MostrarDBData data={this.state.data} />
                    </div>
                    <div class="col-md-7">
                        {gdata}

                    </div>
                </div>
            </>
        }
    }
}


export default Mostrar;