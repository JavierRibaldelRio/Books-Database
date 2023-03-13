import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

//Sub páginas
import Main from './pages/Main';
import AddBook from './pages/Add-Book';
import TablaLibros from './pages/Tabla-Libros'
import MostrarLibro from './pages/MostrarLibro';
import Editar from './pages/Editar';
import Buscar from './pages/Buscar'
import Descargar from './pages/Descargar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path='/tabla-libros' element={<TablaLibros />} />
        <Route path='/editar' element={<Editar />} />
        <Route path='/:id' element={<MostrarLibro />} />
        <Route path='/buscar' element={<Buscar />} />
        <Route path='/descargar' element={<Descargar />} />
      </Routes>

      <a href='/tabla-libros'>TABLA</a>
    </BrowserRouter>
  );
}

export default App;
