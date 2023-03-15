//Crea una lista que contiene todas las etiquetas
import { pasarAMayusFrase } from "../../scripts/pasarAMayus"

import '../../style/coleccion_list.css';
function ColecionesList(props) {


    if (props.colecciones) {
        var colecciones = props.colecciones.map((x) =>
            <li key={x.coleccion_id} style={{ borderColor: x.color }}>
                <label className="item-lista-coleccion" htmlFor={x.nombre}>
                    <input id={x.nombre} type="checkbox" name="coleciones" value={x.coleccion_id} /> {pasarAMayusFrase(x.nombre)}
                </label>
            </li>

        )



        return <ul id="lista-colecciones" className="col-md-3">
            {colecciones}
        </ul>
    }

    else
        return <></>

}


export default ColecionesList;