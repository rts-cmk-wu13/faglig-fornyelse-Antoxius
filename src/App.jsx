import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery/Gallery';
import Categories from './components/Categories/Categories';
import Shop from './components/Shop/Shop';
import LatestArrival from './components/LatestArrival/LatestArrival';
import OurProducts from './components/OurProducts/OurProducts';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import ComingSoon from './components/ComingSoon/ComingSoon';
import MyOrders from './components/MyOrders/MyOrders';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <Gallery />
              <Categories />
              <LatestArrival />
              <OurProducts />
            </>
          } />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/store" element={<ComingSoon pageName="Store" />} />
          <Route path="/marriage-beuro" element={<ComingSoon pageName="Marriage Bureau" />} />
          <Route path="/quraan" element={<ComingSoon pageName="Qura'an" />} />
          <Route path="/dua" element={<ComingSoon pageName="Dua" />} />
          <Route path="/amal" element={<ComingSoon pageName="Amal" />} />
          <Route path="/taqeebat" element={<ComingSoon pageName="Taqeebat" />} />
          <Route path="/support" element={<ComingSoon pageName="Support" />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
