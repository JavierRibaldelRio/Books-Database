import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



// Muestra un diálogo que pregunta al usuario si desea eliminar la colección
function BotonEliminar(props) {

    const { t } = useTranslation();


    // Activa el estado
    const [mostrar, setMostrar] = useState(false);

    // Muestra o escondo la pregunta del usuario

    const handleClose = () => { props.alCerrar(); setMostrar(false); }
    const handleMostrar = () => setMostrar(true);

    const handleRemove = () => { props.eliminar(); handleClose(); }


    return (
        <>

            <button className={'btn btn-danger ' + props.botonProps} onClick={handleMostrar}>
                {t('eliminar')} &nbsp;<FontAwesomeIcon icon={faTrash} />
            </button>

            {/* Confirma la eliminación de  la colección */}

            <Modal show={mostrar} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <span style={{ overflowWrap: "anywhere" }}>{props.texto.titulo}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.texto.body}</Modal.Body>
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

    alCerrar: () => { },
    eliminar: () => { },
    botonProps: '',

}

export default BotonEliminar;