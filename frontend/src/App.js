
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import io from 'socket.io-client';
import Frontpage from './components/Frontpage/Frontpage';
import Login from './components/Login/Login';
import Signup from './components/Login/SignUp';
import Admin from './components/Admin/Admin';
import Category from './components/Admin/Category/Category.js';
import CategoryTable from './components/Admin/Category/CategoryTable.js';
import CategoryUpdate from './components/Admin/Category/CategoryUpdate.js';
import ChefForm from './components/Admin/AddChef.js/AddChef.js';
import ChefCard from './components/Admin/AddChef.js/AddChefCards.js';
import ChefUpdate from './components/Admin/AddChef.js/AdChefUpdate.js';
import FoodForm from './components/Admin/Food/FoodForm.js';
import FoodTable from './components/Admin/Food/FoodTable.js';
import FoodUpdate from './components/Admin/Food/FoodUpdate.js';
import Ncart from './components/Ncart.js';
import Payment from './components/Payment/Payment.js';
import PaymentDetails from './components/Admin/Payment Details/PaymentDetails.js';
import OrderHistory from './components/OrderHistory.js';
import Menu from './components/Frontpage/Menu.js';
import AdminOrder from './components/Admin/Order/Order.js';


const socket = io('https://food-ordering-app-wlwn.onrender.com'); // Correct Socket.IO connection

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const user = JSON.parse(localStorage.getItem('currentUser'));
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const addToCart = (food) => {
    setCartItems([...cartItems, food]);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signup setUserId={setUserId} />} />
          <Route path='/login' element={<Login setUserId={setUserId} />} />
          <Route path='/frontpage/:id' element={<Frontpage cartItems={cartItems}  />} />
          <Route path='/menu' element={<Menu selectedCategory={selectedCategory} addToCart={addToCart} userId={userId} cartItems={cartItems} />} />
          <Route path='/cart/:id' element={<Ncart userId={userId} cartItems={cartItems} addToCart={addToCart} />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/admin/:id' element={<Admin />} />
          <Route path='/category' element={<Category />} />
          <Route path='/categoryTable' element={<CategoryTable />} />
          <Route path='/categoryUpdate/:id' element={<CategoryUpdate />} />
          <Route path='/chefForm' element={<ChefForm />} />
          <Route path='/chefCard' element={<ChefCard />} />
          <Route path='/chefUpdate/:id' element={<ChefUpdate />} />
          <Route path='/food' element={<FoodForm />} />
          <Route path='/foodTable' element={<FoodTable />} />
          <Route path='/foodUpdate/:id' element={<FoodUpdate />} />
          <Route path='/order/:id' element={<AdminOrder selectedCategory={selectedCategory} addToCart={addToCart} userId={userId} socket={socket} />} />
          <Route path='/paymentDetails' element={<PaymentDetails />} />
          <Route path='/orderhistory/:id' element={<OrderHistory socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
