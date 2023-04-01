// Es la página principal de la web de book database

import GraficoSectores from "../components/D3/GraficoSectores";

function Main() {



    const data = { castellano: 12, ruso: 17, valenciano: 5 }

    return <><h2>HOLAssDF DFSDDF</h2>

        <GraficoSectores width={450} height={450} margin={40} data={data} ruta="/api/data/fetch-idiomas" />

    </>;
}

export default Main;