import {Container} from 'react-bootstrap';

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/home-screen";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductScreen from "./screen/product-screen";
import CartScreen from "./screen/cart-screen";
import LoginScreen from "./screen/login-screen";
import RegisterScreen from "./screen/register-screen";
import ProfileScreen from "./screen/profile-screen";
import ShippingScreen from "./screen/shipping-screen";
import PaymentScreen from "./screen/payment-screen";
import OrderScreen from "./screen/order-screen";
import UserListScreen from "./screen/user-list-screen";
import UserEditScreen from "./screen/user-edit-screen";
import ProductListScreen from "./screen/product-list-screen";
import PlaceOrderScreen from "./screen/placeorder-screen";
import ProductEditScreen from "./screen/product-edit-screen";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main className='py-3'>
          <Container>
              <Routes>
                  <Route path='/login' element={<LoginScreen/>}/>
                  <Route path='/register' element={<RegisterScreen/>}/>
                  <Route path='/profile' element={<ProfileScreen/>}/>
                  <Route path='/' element={<HomeScreen/>} exact/>
                  <Route path='/products/:id' element={<ProductScreen/>}/>
                  <Route path='/cart'>
                      <Route path='/cart/:id' element={<CartScreen/>}/>
                      <Route path='/cart' element={<CartScreen/>}/>
                  </Route>
                  <Route path='/shipping' element={<ShippingScreen/>}/>
                  <Route path='/payment' element={<PaymentScreen/>}/>
                  <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
                  <Route path='/order/:id' element={<OrderScreen/>}/>
                  <Route path='/admin/userlist' element={<UserListScreen/>}/>
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
                  <Route path='/admin/productlist/' element={<ProductListScreen/>}/>
                  <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
              </Routes>
          </Container>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
