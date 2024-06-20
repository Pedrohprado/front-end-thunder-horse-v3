import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/home';
import RightMenu from './components/rightmenu';

function App() {
  return (
    <BrowserRouter>
      <RightMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ciclodeservico' />
        <Route path='/dispositivos' />
        <Route path='/monitoramento' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
