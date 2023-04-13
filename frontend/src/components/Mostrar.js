// Hace una llamada a la API  y mustra los resultados

import React, { Component } from 'react';
import Titulo from './Titulo';
import MostrarDBData from './mostrar/DBData';
import MostrarGoogleData from './mostrar/GoogleData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

// Funciones
import { pasarAMayusFrase } from '../scripts/pasarAMayus';
import AlertaCerrable from './AlertaCerrable';

import { Trans, withTranslation } from "react-i18next";

class Mostrar extends Component {
    constructor(props) {
        super(props);

        this.state = { data: null, gdata: null }

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

        if (this.state.data === null) {

            return <AlertaCerrable tipo="danger" texto={t("no-connect-db")} />

        } else {

            let gdata;

            if (this.state.gdata === null) {

                gdata = <AlertaCerrable tipo="warning" texto={<Trans>sin-info-google</Trans>} />

            } else {

                gdata = <MostrarGoogleData data={this.state.gdata[0]} />

            }


            return <><Titulo text={pasarAMayusFrase(this.state.data.titulo)} />
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