import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/home';
import RightMenu from './components/rightmenu';
import Context from './globalcontext/globalcontext';

function App() {
  return (
    <Context>
      <BrowserRouter>
        <RightMenu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ciclodeservico' />
          <Route path='/dispositivos' />
          <Route path='/monitoramento' />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
