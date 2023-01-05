import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import AddBook from './pages/Add-Book';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Main />} >
          <Route path='/add-book' element={<AddBook />} />

        </Route >

      </Routes>
    </BrowserRouter>
  );
}

export default App;
