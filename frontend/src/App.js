import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Css

import './style/colecciones_mostrar.css'

//Cabecera
import Cabecera from './components/Cabecera';

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
import P404 from './pages/404';

function App() {
  return (
    <BrowserRouter>
      <Cabecera />
      <main>
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

          {/* Página 404 */}

          <Route path='*' element={<P404 />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
