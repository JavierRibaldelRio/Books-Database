
import { pasarAMayusFrase } from "../scripts/pasarAMayus";

function FilaLibros(props) {

    const { libro_id, autor, fecha_inicio, fecha_finalizacion, idioma, titulo } = props.libro;

    var fi = transformarFecha(fecha_inicio);

    var ff = transformarFecha(fecha_finalizacion);

    return <tr>
        <td>{libro_id}</td>
        <td>{pasarAMayusFrase(titulo)}</td>
        <td>{pasarAMayusFrase(autor)}</td>
        <td>{pasarAMayusFrase(idioma)}</td>
        <td>{fi}</td>
        <td>{ff}</td>

    </tr>
}

export default FilaLibros;


function transformarFecha(str) {

    if (typeof str === 'string' && str != '') {
        return str.split('-').reverse().join('-') || '';
    }
    return '-';
}