
import React from 'react';
import { useParams } from 'react-router-dom';
import Mostrar from '../components/Mostrar';

//Muesta un libros
function MostrarLibro() {
    const { id } = useParams();
    return (<Mostrar id={id} />);
}

export default MostrarLibro;