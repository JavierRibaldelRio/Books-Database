import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Main from './pages/Main';
import AddBook from './pages/Add-Book';
import TablaLibros from './pages/Tabla-Libros'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path='/tabla-libros' element={<TablaLibros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
