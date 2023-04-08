import React, { useEffect, useState } from 'react';


function Contadores() {

    const [data, setData] = useState({});


    useEffect(() => {
        fetch('/api/data/fetch-datos-generales').then(res => res.json()).then(data => setData(data)).catch(err => console.log('err :>> ', err))
    }, []);


    return <>

        <ul>
            <li><strong>Libros: </strong>{data.libros}</li>
            <li><strong>Colecciones: </strong>{data.colecciones}</li>
            <li><strong>Media de días por libro: </strong>{data.media}</li>
        </ul></>

}

export default Contadores