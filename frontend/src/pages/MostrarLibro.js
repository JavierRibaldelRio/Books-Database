
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mostrar from '../components/Mostrar';

//Muesta un libros
function MostrarLibro() {
    const { id } = useParams();
    return (<Mostrar id={id} navigate={useNavigate()} />);
}

export default MostrarLibro;