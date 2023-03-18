import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Cs

import './style/colecciones.css'

//Sub páginas
import Main from './pages/Main';
import AddBook from './pages/Add-Book';
import TablaLibros from './pages/Tabla-Libros'
import MostrarLibro from './pages/MostrarLibro';
import Editar from './pages/Editar';
import Buscar from './pages/Buscar'
import Descargar from './pages/Descargar';
import CrearColeccion from './pages/Crear-Coleccion';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path='/tabla-libros' element={<TablaLibros />} />
        <Route path='/editar' element={<Editar />} />
        <Route path='/libro/:id' element={<MostrarLibro />} />
        <Route path='/buscar' element={<Buscar />} />
        <Route path='/descargar' element={<Descargar />} />
        <Route path='/crear-coleccion' element={<CrearColeccion />} />

      </Routes>

      <a href='/tabla-libros'>TABLA</a>
    </BrowserRouter>
  );
}

export default App;
