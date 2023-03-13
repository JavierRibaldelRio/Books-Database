
import { pasarAMayusFrase } from "../scripts/pasarAMayus";

import transformarFecha from "../scripts/transformarFecha";

import { Link } from 'react-router-dom';

function FilaLibros(props) {

    const { libro_id, autor, fecha_inicio, fecha_finalizacion, idioma, titulo } = props.libro;

    var fi = transformarFecha(fecha_inicio);


    var ff = transformarFecha(fecha_finalizacion);

    return <tr>
        <td>{libro_id}</td>
        <td title="+ Mas info" className="link">
            <Link to={'../' + libro_id}>
                {pasarAMayusFrase(titulo)}

            </Link></td>
        <td>{pasarAMayusFrase(autor)}</td>
        <td>{pasarAMayusFrase(idioma)}</td>
        <td>{fi}</td>
        <td>{ff}</td>

    </tr>
}

export default FilaLibros;


