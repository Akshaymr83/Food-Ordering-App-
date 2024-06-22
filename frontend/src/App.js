// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import Frontpage from './components/Frontpage/Frontpage';
// import Login from './components/Login/Login';
// import Signup from './components/Login/SignUp';
// import Admin from './components/Admin/Admin';
// import Category from './components/Admin/Category/Category.js';
// import CategoryTable from './components/Admin/Category/CategoryTable.js';
// import CategoryUpdate from './components/Admin/Category/CategoryUpdate.js';
// import ChefForm from './components/Admin/AddChef.js/AddChef.js';
// import ChefCard from './components/Admin/AddChef.js/AddChefCards.js';
// import ChefUpdate from './components/Admin/AddChef.js/AdChefUpdate.js';
// import FoodForm from './components/Admin/Food/FoodForm.js';
// import FoodTable from './components/Admin/Food/FoodTable.js';
// import FoodUpdate from './components/Admin/Food/FoodUpdate.js';
// import Ncart from './components/Ncart.js';
// import Review from './components/Frontpage/Review.js';
// import Payment from './components/Payment/Payment.js';
// import Order from './components/Admin/Order/Order.js';
// import PaymentDetails from './components/Admin/Payment Details/PaymentDetails.js';
// import NAV from './components/Navbar/NAV.js';
// import OrdersPage from './components/Admin/Order/Order.js';
// import AdminDashboard from './components/Admin/Order/Order.js';
// import OrderHistory from './components/OrderHistory.js';
// import Menu from './components/Frontpage/Menu.js';
// import AdminOrder from './components/Admin/Order/Order.js';
// import PaymentForm from './components/Payment/Payment.js';
// import PaymentPage from './components/Payment/Payment.js';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const addToCart = (food) => {
//     setCartItems([...cartItems, food]);
//   };
//   const total = 0;
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path='/' element={<Signup/>} />
//           <Route path='/login' element={<Login/>} />
//           <Route path='/frontpage/:id' element={<Frontpage cartItems={cartItems}/>} />
//           <Route path='/menu' element={<Menu selectedCategory={selectedCategory} addToCart={addToCart}  userId={userId}/>} />
//           {/* Pass addToCart function to Ncart component */}
//           <Route path='/cart/:id' element={<Ncart cartItems={cartItems} addToCart={addToCart} />} />
        
//           <Route path="/payment/:id" element={<Payment/>} />
          
         
//           <Route path='/admin/:id' element={<Admin/>} />
//           <Route path='/category' element={<Category/>} />
//           <Route path='/categoryTable' element={<CategoryTable/>} />
//           <Route path='/categoryUpdate/:id' element={<CategoryUpdate/>} />
//           <Route path='/chefForm' element={<ChefForm/>} />
//           <Route path='/chefCard' element={<ChefCard/>} />
//           <Route path='/chefUpdate/:id' element={<ChefUpdate/>} />
//           <Route path='/food' element={<FoodForm/>} />
//           <Route path='/foodTable' element={<FoodTable/>} />
//           <Route path='/foodUpdate/:id' element={<FoodUpdate/>} />
//           <Route path='/order/:id' element={<AdminOrder cartItems={cartItems} addToCart={addToCart} />} />
//           {/* <Route path='/orders' element={<AdminDashboard/>} /> */}
//           <Route path='/paymentDetails' element={<PaymentDetails />} />
//           {/* <Route path='/ordersPage/:id' element={<OrdersPage/>}/> */}
//           <Route path='/orderhistory/:id' element={<OrderHistory/>}/>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;






















// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// import Frontpage from './components/Frontpage/Frontpage';
// import Login from './components/Login/Login';
// import Signup from './components/Login/SignUp';
// import Admin from './components/Admin/Admin';
// import Category from './components/Admin/Category/Category.js';
// import CategoryTable from './components/Admin/Category/CategoryTable.js';
// import CategoryUpdate from './components/Admin/Category/CategoryUpdate.js';
// import ChefForm from './components/Admin/AddChef.js/AddChef.js';
// import ChefCard from './components/Admin/AddChef.js/AddChefCards.js';
// import ChefUpdate from './components/Admin/AddChef.js/AdChefUpdate.js';
// import FoodForm from './components/Admin/Food/FoodForm.js';
// import FoodTable from './components/Admin/Food/FoodTable.js';
// import FoodUpdate from './components/Admin/Food/FoodUpdate.js';
// import Ncart from './components/Ncart.js';
// import Review from './components/Frontpage/Review.js';
// import Payment from './components/Payment/Payment.js';
// import Order from './components/Admin/Order/Order.js';
// import PaymentDetails from './components/Admin/Payment Details/PaymentDetails.js';
// import NAV from './components/Navbar/NAV.js';
// import OrdersPage from './components/Admin/Order/Order.js';
// import AdminDashboard from './components/Admin/Order/Order.js';
// import OrderHistory from './components/OrderHistory.js';
// import Menu from './components/Frontpage/Menu.js';
// import AdminOrder from './components/Admin/Order/Order.js';
// import PaymentForm from './components/Payment/Payment.js';
// import PaymentPage from './components/Payment/Payment.js';

// function App() {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const addToCart = (food) => {
//     setCartItems([...cartItems, food]);
//   };
//   const total = 0;
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path='/' element={<Signup />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/frontpage/:id' element={<Frontpage cartItems={cartItems} />} />
//           <Route path='/menu' element={<Menu selectedCategory={selectedCategory} addToCart={addToCart} userId={userId} />} />
//           <Route path='/cart/:id' element={<Ncart cartItems={cartItems} addToCart={addToCart} />} />
//           <Route path='/payment' element={<PaymentPage />} /> {/* Ensure the correct path */}
//           <Route path='/admin/:id' element={<Admin />} />
//           <Route path='/category' element={<Category />} />
//           <Route path='/categoryTable' element={<CategoryTable />} />
//           <Route path='/categoryUpdate/:id' element={<CategoryUpdate />} />
//           <Route path='/chefForm' element={<ChefForm />} />
//           <Route path='/chefCard' element={<ChefCard />} />
//           <Route path='/chefUpdate/:id' element={<ChefUpdate />} />
//           <Route path='/food' element={<FoodForm />} />
//           <Route path='/foodTable' element={<FoodTable />} />
//           <Route path='/foodUpdate/:id' element={<FoodUpdate />} />
//           <Route path='/order/:id' element={<AdminOrder cartItems={cartItems} addToCart={addToCart} />} />
//           <Route path='/paymentDetails' element={<PaymentDetails />} />
//           <Route path='/orderhistory/:id' element={<OrderHistory />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

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
import Review from './components/Frontpage/Review.js';
import Payment from './components/Payment/Payment.js';
import Order from './components/Admin/Order/Order.js';
import PaymentDetails from './components/Admin/Payment Details/PaymentDetails.js';
import NAV from './components/Navbar/NAV.js';
import OrdersPage from './components/Admin/Order/Order.js';
import AdminDashboard from './components/Admin/Order/Order.js';
import OrderHistory from './components/OrderHistory.js';
import Menu from './components/Frontpage/Menu.js';
import AdminOrder from './components/Admin/Order/Order.js';
import PaymentForm from './components/Payment/Payment.js';
import PaymentPage from './components/Payment/Payment.js';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const addToCart = (food) => {
    setCartItems([...cartItems, food]);
  };
  const total = 0;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/frontpage/:id' element={<Frontpage cartItems={cartItems}/>} />
          <Route path='/menu' element={<Menu selectedCategory={selectedCategory} addToCart={addToCart}  userId={userId}/>} />
          {/* Pass addToCart function to Ncart component */}
          <Route path='/cart/:id' element={<Ncart userId={userId} cartItems={cartItems} addToCart={addToCart} />} />
        
          <Route path="/payment/:id" element={<Payment/>} />
          
         
          <Route path='/admin/:id' element={<Admin/>} />
          <Route path='/category' element={<Category/>} />
          <Route path='/categoryTable' element={<CategoryTable/>} />
          <Route path='/categoryUpdate/:id' element={<CategoryUpdate/>} />
          <Route path='/chefForm' element={<ChefForm/>} />
          <Route path='/chefCard' element={<ChefCard/>} />
          <Route path='/chefUpdate/:id' element={<ChefUpdate/>} />
          <Route path='/food' element={<FoodForm/>} />
          <Route path='/foodTable' element={<FoodTable/>} />
          <Route path='/foodUpdate/:id' element={<FoodUpdate/>} />
          <Route path='/order/:id' element={<AdminOrder cartItems={cartItems} addToCart={addToCart} />} />
          {/* <Route path='/orders' element={<AdminDashboard/>} /> */}
          <Route path='/paymentDetails' element={<PaymentDetails />} />
          {/* <Route path='/ordersPage/:id' element={<OrdersPage/>}/> */}
          <Route path='/orderhistory/:id' element={<OrderHistory/>}/>
         
          </Routes>
      </Router>
    </div>
  );
}

export default App;