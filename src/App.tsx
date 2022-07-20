import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import storeData from './data/items.json'
import './styles/reset.scss'
import './styles/global.scss'
import { ShoppingCart } from './pages/ShoppingCart';
import { Shop } from './pages/Shop';
import { Navbar } from './components/Navbar';



function App() {

  const [selectShop, setSelectShop] = useState<number>()
  const [selectedProducts, setSelectedProducts] = useState<[]>([])

  useEffect(() => {
    console.log(selectedProducts)
    // console.log('SHOP', selectShop)
  }, [selectedProducts, selectShop])

  return (
    <div className="App">
      <div className="app__container">
        <Navbar />
        <Routes>
          <Route path='/shop' element={<Shop selectedProducts={selectedProducts} setSelectedShop={setSelectShop} setSelectedProducts={setSelectedProducts} />} />
          <Route path='/shopping-cart' element={<ShoppingCart selectedProducts={selectedProducts} />} />
        </Routes>

      </div>

    </div >
  );
}

export default App;
