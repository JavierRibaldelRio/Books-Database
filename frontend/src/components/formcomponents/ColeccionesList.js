//Crea una lista que contiene todas las etiquetas
import EstiloColeccion from "../../classes/EstiloEtiquetaColeccion";
import { pasarAMayusFrase } from "../../scripts/pasarAMayus"

import '../../style/coleccion_list.css';
function ColecionesList(props) {

    // Si hay colecciones
    if (props.colecciones) {

        // Genera todos los liss de las colecciones
        var colecciones = props.colecciones.map((x) =>
            <li key={x.coleccion_id} style={new EstiloColeccion(x.color)}>
                <label className="item-lista-coleccion" htmlFor={x.nombre}>
                    <input id={x.nombre} type="checkbox" name="colecciones" value={x.coleccion_id} /> {pasarAMayusFrase(x.nombre)}
                </label>
            </li>

        )


        //Devuelve todas las colecciones
        return <div className="col-md-3"> Colección:<ul id="lista-colecciones" >
            {colecciones}
        </ul></div>
    }

    // Si no hay colecciones definidas
    else
        return <></>

}


export default ColecionesList;