import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Css

import './style/colecciones_mostrar.css'

//Sub páginas
import Main from './pages/Main';
import AddBook from './pages/Add-Book';
import TablaLibros from './pages/Tabla-Libros'
import MostrarLibro from './pages/MostrarLibro';
import Editar from './pages/Editar';
import Buscar from './pages/Buscar'
import Descargar from './pages/Descargar';
import CrearColeccion from './pages/Crear-Coleccion';
import MostrarColecciones from './pages/Mostrar-Colecciones';
import EditarColeccion from './pages/Editar-Coleccion';
import VerColeccion from './pages/Ver-Coleccion';
import Configuracion from './pages/Configuracion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Libros */}
        <Route path="/" element={<Main />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path='/editar' element={<Editar />} />
        <Route path='/libro/:id' element={<MostrarLibro />} />
        {/* Gestión General */}
        <Route path='/buscar' element={<Buscar />} />
        <Route path='/descargar' element={<Descargar />} />
        <Route path='/tabla-libros' element={<TablaLibros />} />
        <Route path='/configuracion' element={<Configuracion />} />

        {/* Colecciones */}
        <Route path='/colecciones' element={<MostrarColecciones />} />
        <Route path='/colecciones/crear-coleccion' element={<CrearColeccion />} />
        <Route path='/colecciones/editar' element={<EditarColeccion />} />
        <Route path='/colecciones/:id' element={<VerColeccion />} />
      </Routes>
      <br />
      <a href='/tabla-libros'>TABLA</a>
    </BrowserRouter>
  );
}

export default App;
