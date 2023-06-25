// Hace una llamada a la API  y mustra los resultados

import React, { Component } from 'react';

import Titulo from './Titulo';
import MostrarDBData from './mostrar/DBData';
import MostrarGoogleData from './mostrar/GoogleData';
import AlertaCerrable from './AlertaCerrable';

// Funciones
import { pasarAMayusFrase } from '../scripts/pasarAMayus';

import Alerta from '../classes/Alerta';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Trans, withTranslation } from "react-i18next";

import Spinner from 'react-bootstrap/Spinner';

class Mostrar extends Component {
    constructor(props) {
        super(props);

        this.state = { data: null, gdata: undefined }

        this.eliminar = this.eliminar.bind(this);

        this.editar = this.editar.bind(this);
    }


    eliminar() {


        const { t } = this.props;

        if (window.confirm(t("pre-libro"))) {

            fetch('/api/remove-book/' + this.state.data.libro_id, { method: 'DELETE' });

        }

    }

    editar() {

        const { navigate } = this.props;

        navigate('/editar', { state: { data: this.state.data } });

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

        //Traducción

        const { t } = this.props

        // Si no  hay datos que mostrar de la base de datos o no se ha podido establecer conexión
        if (this.state.data === null) {

            return <AlertaCerrable alerta={new Alerta(true, t("no-connect-db"), "danger")} />

        }

        else {

            let gdata;

            if (this.state.gdata === null) {

                gdata = <AlertaCerrable alerta={new Alerta(true, <Trans>sin-info-google</Trans>, "warning")} />

            }

            // Spinner de Cargando
            else if (this.state.gdata === undefined) {

                gdata = <Spinner animation="border" role="status" variant="secondary" >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }

            else {

                gdata = <MostrarGoogleData data={this.state.gdata[0]} />

            }


            return <><Titulo text={pasarAMayusFrase(this.state.data.titulo)} mayusculas={false} />
                <div className="modal-body row">


                    <div className="col-md-5">
                        <MostrarDBData data={this.state.data} />

                        <div id='botones-mostrar'>

                            <button type="button" onClick={this.editar} className="btn btn-primary">{t('editar')} &nbsp; <FontAwesomeIcon icon={faPenToSquare} /></button>

                            <button type="button" onClick={this.eliminar} className="btn btn-danger">{t("eliminar")} &nbsp; <FontAwesomeIcon icon={faTrash} /> </button>
                        </div>
                    </div>
                    <div className="col-md-7">
                        {gdata}

                    </div>
                </div>
            </>
        }
    }
}


export default withTranslation()(Mostrar);