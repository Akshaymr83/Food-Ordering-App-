
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu({ selectedCategory, updateCart }) {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('lowToHigh'); // State for sorting order
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    axios.get("https://food-ordering-app-wlwn.onrender.com/getFood")
      .then((res) => {
        console.log("Data received:", res.data);
        setFoods(res.data.foods);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });

    // Fetch cart items from the backend or localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(existingCart);
  }, []);

  const handleAddToCart = async (food) => {
    if (food.availability !== "Available") {
      toast.error("Sorry, this item is not available.");
      return;
    }

    if (cartItems.some(cartItem => cartItem._id === food._id)) {
      toast.error("Food already added to cart.");
      return;
    }

    try {
      console.log("Adding food to cart:", food);
      const response = await axios.post(`https://food-ordering-app-wlwn.onrender.com/addToCart/${user._id}`, food);
      if (response.status === 200) {
        updateCart(food); // Notify parent component to update cart
        const updatedCartItems = [...cartItems, food];
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        toast.success(`${food.foodname} added to cart!`);
      } else {
        toast.success(`${food.foodname} added to cart!`);
       
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const filteredFoods = foods
    .filter(food =>
      (food.category === selectedCategory || selectedCategory === "All") &&
      food.foodname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <div>
      
      <div style={{ overflowX: 'hidden' }}>
        <div className="menu" id="Menu">
          <h1>Our<span>Menu</span></h1>
          <form className="searchForm form" id='searchForm' style={{ border: '1px solid black', width: '30%', marginLeft: '35%', marginBottom: '1rem', padding: '1rem' }}>
            <button>
              <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            <input
              style={{ width: "100%", border: 'none' }}
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <div className="dropdownContainer" style={{ width: '30%', marginLeft: '35%', marginBottom: '3rem', padding: '1rem', textAlign: 'center' }}>
            <label htmlFor="sortOrder"><b>Sort by Price: </b></label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ width: '30%', padding: '0.5rem', marginTop: '0.5rem',marginLeft:'10px',borderRadius:"10px" }}
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <div className="menu_box">
            {filteredFoods.map((food, index) => (
              <div className="menu_card" key={index}>
                <div className="menu_image">
                  <img src={`https://food-ordering-app-wlwn.onrender.com/${food.image}`} alt={`Food ${food.foodname}`} />
                  <div className='info' style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' ,padding:'0',margin:'0'}}><b>{food.foodname}</b></p>
                    <p style={{ fontSize: '11px',padding:'0',margin:'0' }}>{food.description}</p>
                    <p style={{fontSize: '15px',padding:'2px',margin:'0'}}><b>{food.price} $</b></p>
                    <p style={{fontSize: '13px',padding:'2px',margin:'0'}}><b>{food.category}</b></p>
                    <p style={{fontSize: '11px',padding:'20x',margin:'0'}}>{food.availability}</p>
                    <button
                      onClick={() => handleAddToCart(food)}
                      style={{ color: 'white', background: '#fb2157', border: 'none', borderRadius: '1rem', padding: '4px 23px', textDecoration: 'none',marginTop:'2px' }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr></hr>
        <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </div>
  );
}

export default Menu;


