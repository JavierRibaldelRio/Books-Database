import MostrarLibros from '../components/MostrarLibros';
import Titulo from '../components/Titulo';

function TablaLibros() {

    return <>
        <Titulo text="TABLA LIBROS"></Titulo>

        <MostrarLibros mensajeError="No se ha podido establecer conexión con las Base de Datos" />
    </>
}

export default TablaLibros;