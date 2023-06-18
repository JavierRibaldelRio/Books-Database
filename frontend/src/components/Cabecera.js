import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useState } from 'react';


import { useTranslation } from 'react-i18next';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { faPlus, faSearch, faTable, faDownload, faBuildingColumns, faBook, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LinkCabecera from './cabecera/LinkCabecera';
import pasarAMayusPalabra from '../scripts/pasarAMayus';


// Crea la cabecera de la web
function Cabecera() {

    //https://react-bootstrap.github.io/components/navbar/

    const { t } = useTranslation();
    // Configuracione sde la barra
    const expand = "lg";

    const tipo = "dark";

    //Crea los objetos de los enlaces
    const links = [new Enlace('/add-book', 'Anyadir-libro', faPlus), new Enlace('/colecciones', "colecciones", faBuildingColumns), new Enlace("/buscar", "buscar", faSearch), new Enlace("/tabla-libros", "tabla", faTable), new Enlace("/descargar", "descargar", faDownload), new Enlace('/configuracion', '', faGear)];

    // Crea los links desde los objetos
    const enlacesNav = links.map(link => <LinkCabecera key={link.traduccion} link={link} />)


    // Crea el estado de el libro a buscar

    let [libro, setLibro] = useState('');

    const handleChange = (e) => setLibro(e.target.value)

    // Obtiene los datos de Navigate
    const navigate = useNavigate();

    const buscarLibro = (e) => {

        e.preventDefault();

        // Pasa a la sección de buscar
        navigate('/buscar', { state: libro });

        // Borra el contenido del input
        setLibro('');
    }


    // Al estar en /buscar bloque la opción de buscar


    const { pathname } = useLocation();

    let busquedaDesactivada = pathname === '/buscar';



    return <header><Navbar key={expand} fixed="top" bg={tipo} variant={tipo} expand={expand} className="mb-3" >
        <Container fluid>
            <Navbar.Brand><Link className='nav-link' to="/">{<FontAwesomeIcon icon={faBook} />} &nbsp;{t("db-libros")}</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">

                        {enlacesNav}

                    </Nav>
                    <Form className="d-flex" onSubmit={buscarLibro}>
                        <Form.Control
                            type="search"
                            placeholder={t('libro-a-buscar')}
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChange}
                            value={libro}
                            disabled={busquedaDesactivada}
                        />
                        <Button variant="outline-light" type="submit" disabled={busquedaDesactivada}>{pasarAMayusPalabra(t('buscar'))}</Button>
                    </Form>

                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Container>
    </Navbar></header >

}



class Enlace {

    constructor(ruta, traduccion, ico) {

        this.ruta = ruta;
        this.traduccion = traduccion;
        this.ico = ico;
    }
}

export default Cabecera