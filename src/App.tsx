// import './index.css'
import { Route, Routes } from 'react-router-dom';
import './styles/reset.scss'
import './styles/global.scss'
import { ShoppingCart } from './pages/ShoppingCart';
import { Shop } from './pages/Shop';
import { Navbar } from './components/Navbar';
import { Orders } from './pages/Orders';

function App() {

  return (
    <div className="container mx-auto px-4 pr-4">
      <Navbar />
      <Routes>
        <Route path='/shop' element={<Shop />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
