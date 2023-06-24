import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { pasarAMayusFrase } from '../../scripts/pasarAMayus';
import Alerta from '../../classes/Alerta';

// Muestra un diálogo que pregunta al usuario si desea eliminar la colección
function BotonEliminar(props) {

    const { t } = useTranslation();


    // Activa el estado
    const [mostrar, setMostrar] = useState(props.mostrar);

    // Muestra o escondo la pregunta del usuario

    const handleClose = () => { props.mostrarTitulo(); setMostrar(false); }
    const handleMostrar = () => setMostrar(true);

    const handleRemove = () => { eliminarColeccion(); handleClose(); }


    // Elimina la colección
    function eliminarColeccion() {

        // Elimna la coleccón
        fetch('/api/collection/remove-collection/' + props.id, { method: 'DELETE' }).then((res) => {
            if (res.status === 204) {

                const texto = pasarAMayusFrase(props.coleccion) + " " + t("col-eliminada");

                // Alerta al usuario de que la colección ha sido eliminada correctamente
                props.alertar(new Alerta(true, texto, "success"));


            } else {

                // Alerta en caso de que se haya producido un error
                props.alertar(new Alerta(true, t('col-no-eli'), "danger"))

            }
        }).catch(e => console.error(`Se ha producido un error: "`));


    }



    return (
        <>

            <button className='btn btn-danger boton-coleccion' onClick={handleMostrar}>
                {t('eliminar')} &nbsp;<FontAwesomeIcon icon={faTrash} />
            </button>

            {/* Confirma la eliminación de  la colección */}

            <Modal show={mostrar} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <span style={{ overflowWrap: "anywhere" }}>{t("eliminar")}: {props.coleccion}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("pregunta-eliminar-col")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('cancelar')}

                    </Button>
                    <Button variant="danger" onClick={handleRemove}>
                        {t("eliminar")} &nbsp;<FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}



BotonEliminar.defaultProps = {

    mostrar: false
}

export default BotonEliminar;