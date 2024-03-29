//Crea una lista que contiene todas las etiquetas
import EstiloColeccion from "../../classes/EstiloEtiquetaColeccion";
import { pasarAMayusFrase } from "../../scripts/pasarAMayus"

import { useTranslation } from "react-i18next";

import '../../style/coleccion_list.css';
function ColecionesList(props) {

    const { t } = useTranslation();


    const checked = (id) => {

        if (props.coleccionesSeleccionadas !== []) {

            return props.coleccionesSeleccionadas.includes(id)

        }

        else {
            return false;
        }

    }

    // Si hay colecciones
    if (props.colecciones) {

        // Genera todos los liss de las colecciones
        let colecciones = props.colecciones.map((x) =>
            <li key={x.coleccion_id} style={new EstiloColeccion(x.color)}>
                <label className="flex-center" htmlFor={x.nombre}>

                    <span className="elipse">
                        <input id={x.nombre} type="checkbox" name="colecciones" value={x.coleccion_id} defaultChecked={checked(x.coleccion_id)} onChange={props.onChange} /> {pasarAMayusFrase(x.nombre)}</span>
                </label>
            </li>

        )


        //Devuelve todas las colecciones
        return <div className="col-md-3"> {t('coleccion')}:<ul id="lista-colecciones" >
            {colecciones}
        </ul></div>
    }

    // Si no hay colecciones definidas
    else
        return <></>

}


ColecionesList.defaultProps = {

    coleccionesSeleccionadas: null
}

export default ColecionesList;