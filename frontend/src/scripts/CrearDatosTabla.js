import esFecha from "./esFecha";
//Crea los datos de la tabla con las fechas ya formateadas

function crearData(x) {

    if (esFecha(x.fecha_finalizacion)) {
        x.fecha_finalizacion_date = new Date(x.fecha_finalizacion);
    } else {
        x.fecha_finalizacion = null;
    }

    if (esFecha(x['fecha_inicio'])) {

        x.fecha_inicio_date = new Date(x.fecha_inicio);
    }

    else {

        x.fecha_inicio = null;
    }
    return x;
}

export default crearData;