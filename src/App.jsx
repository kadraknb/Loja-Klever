// export default App;
import React from 'react';
import { Home } from './pages/home/Home';
import Detail from './pages/detail/index';
import Cart from './pages/cart/Cart';
import Balance from './pages/balance/Balance';
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
      <div id='app_back'></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/balance" element={<Balance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
