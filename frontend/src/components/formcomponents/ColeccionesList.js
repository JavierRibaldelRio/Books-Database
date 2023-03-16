//Crea una lista que contiene todas las etiquetas
import elegirColorLetra from "../../scripts/elegirColorLetra";
import { pasarAMayusFrase } from "../../scripts/pasarAMayus"

import '../../style/coleccion_list.css';
function ColecionesList(props) {


    if (props.colecciones) {
        var colecciones = props.colecciones.map((x) =>
            <li key={x.coleccion_id} style={{ borderColor: x.color, backgroundColor: x.color, color: elegirColorLetra(x.color) }}>
                <label className="item-lista-coleccion" htmlFor={x.nombre}>
                    <input id={x.nombre} type="checkbox" name="colecciones" value={x.coleccion_id} /> {pasarAMayusFrase(x.nombre)}
                </label>
            </li>

        )



        return <div className="col-md-2"> Colección:<ul id="lista-colecciones" >
            {colecciones}
        </ul></div>
    }

    else
        return <></>

}


export default ColecionesList;