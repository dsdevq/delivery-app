import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/reset.scss'
import './styles/global.scss'
import { ShoppingCart } from './pages/ShoppingCart';
import { MenuProps, Shop } from './pages/Shop';
import { Navbar } from './components/Navbar';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface Products {
  selectedProducts: MenuProps[],
  setSelectedProducts: (values: MenuProps[]) => void
}

function App() {

  const [selectedProducts, setSelectedProducts] = useLocalStorage<MenuProps[]>('delivery-app', [])

  return (
    <div className="App">
      <div className="app__container">
        <Navbar />
        <Routes>
          <Route path='/shop' element={<Shop selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />} />
          <Route path='/shopping-cart' element={<ShoppingCart setSelectedProducts={setSelectedProducts} selectedProducts={selectedProducts} />} />
        </Routes>

      </div>

    </div >
  );
}

export default App;
