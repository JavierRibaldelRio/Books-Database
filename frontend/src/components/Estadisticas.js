import React from 'react';

import GraficoSectores from "../components/D3/GraficoSectores";
import GraficoBarras from "../components/D3/GraficoBarras";
import Contadores from "../components/Contadores";

function Estadisticas() {



    return <div id="estadisticas" className='modal-body row'>
        <div className="col-md-4">

            <Contadores />

            <GraficoSectores name={'tarta-idiomas'} width={450} height={450} margin={40} ruta="/api/data/fetch-idiomas" />

        </div>

        <div className='col-md-8'>
            <GraficoBarras name={'columnas-variables'} margin={40} width={800} height={450} ruta="/api/data/fetch-meses-anyos" />
        </div>

    </div>
}


export default Estadisticas;