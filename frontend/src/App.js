import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Main from './pages/Main';
import AddBook from './pages/Add-Book';
import TablaLibros from './pages/Tabla-Libros'
import MostrarLibro from './pages/MostrarLibro';
import Editar from './pages/Editar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path='/tabla-libros' element={<TablaLibros />} />
        <Route path='/editar' element={<Editar />} />
        <Route path='/:id' element={<MostrarLibro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
