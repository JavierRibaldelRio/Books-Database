// Es la página principal de la web de book database

import { useState } from "react";
import { useLocation } from 'react-router-dom';

import AlertaCerrable from "../components/AlertaCerrable";
import Estadisticas from "../components/Estadisticas";
import Fecha from "../components/Fecha";
import Alerta from "../classes/Alerta";


function Main(props) {

    // Obtiene la localización

    const location = useLocation();

    const [alerta] = useState(location.state || new Alerta())



    return <>

        <AlertaCerrable alerta={alerta} />

        <Fecha />

        <Estadisticas />

    </>;
}

Main.defaultProps = {


    alerta: new Alerta()
}





export default Main;