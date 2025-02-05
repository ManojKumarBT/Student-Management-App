import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<Header />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
