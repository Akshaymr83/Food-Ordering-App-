


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NAV from './Navbar/NAV';
import Footer from './Frontpage/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';

function Ncart() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const url = `https://food-ordering-app-wlwn.onrender.com/user/${id}`;

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        console.log("Cart data received:", res.data);
        // Initialize cart items and aggregate quantities
        const initializedItems = res.data.userCollection.reduce((acc, item) => {
          const existingItem = acc.find(i => i._id === item._id);
          if (existingItem) {
            existingItem.quantity += item.quantity || 1;
          } else {
            acc.push({ ...item, cartItemId: uuidv4(), quantity: item.quantity || 1 });
          }
          return acc;
        }, []);
        setCartItems(initializedItems);
      })
      .catch((err) => {
        console.log("Error fetching cart data:", err);
      });
  }, [id, url]);

  useEffect(() => {
    const newFoodTotal = cartItems.reduce((acc, cartItem) => acc + (cartItem.price || 0) * (cartItem.quantity || 0), 0);
    setFoodTotal(newFoodTotal);
    const newDeliveryCharge = cartItems.reduce((acc, cartItem) => acc + (cartItem.price || 0), 0) * 0.1;
    setDeliveryCharge(newDeliveryCharge);
    setTotal(newFoodTotal + newDeliveryCharge);
  }, [cartItems]);

  const updateCart = (food) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item._id === food._id);
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...food, cartItemId: uuidv4(), quantity: 1 }];
      }
    });
  };

  const handleDelete = async (cartItemId) => {
    try {
      // Delete item from backend
      const itemToDelete = cartItems.find(item => item.cartItemId === cartItemId);
      await axios.delete(`https://food-ordering-app-wlwn.onrender.com/removeFromCart/${id}/${itemToDelete._id}`);
     
      window.location.reload()
    
      // Update local state after deletion
      setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleIncreaseQuantity = (cartItemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (cartItemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId && item.quantity > 1 ? { ...item, quantity: (item.quantity || 0) - 1 } : item
      )
    );
  };

  return (
    <div>
      <NAV cartItems={cartItems} />
      <div className="overflow-x-auto" style={{ marginBottom: '2%' }}>
        <table className="table w-full" style={{ width: '70%', marginLeft: '15%' }}>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Availability</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.cartItemId}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={`https://food-ordering-app-wlwn.onrender.com/${item.image}`} alt={item.foodname} style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
                      </div>
                    </div>
                  </div>
                </td>
                <td><b>{item.foodname}</b></td>
                <td><b>{item.price * item.quantity}</b></td>
                <td >
                  <div style={{border:'1px solid black',width:'70px',borderRadius:'5px'}}>
                  <button style={{ border: 'none', background: 'none', padding: '8px',paddingLeft:'15px' }} onClick={() => handleDecreaseQuantity(item.cartItemId)}><b>-</b></button>
                  {item.quantity}
                  <button style={{ border: 'none', background: 'none', padding: '6px' }} onClick={() => handleIncreaseQuantity(item.cartItemId)}><b>+</b></button>
                  </div>
                  
                </td>
                <td>{item.availability === "Available" ? "Available" : "Not Available"}</td>
                <td>
                  <button
                    style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '38%', backgroundColor: '#fb2157' }}
                    onClick={() => handleDelete(item.cartItemId)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td><b>Food Total</b>:</td>
              <td>{foodTotal}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td><b>Delivery Charge</b>:</td>
              <td>{deliveryCharge}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td><b>Overall Total</b>:</td>
              <td><b>{total}</b></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        </div>
        <div style={{ paddingTop: '5%' }}>
          <Link to={`/payment/${id}`} state={{ total }}>
            <button
              style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '17%', marginLeft: '40%', backgroundColor: '#fb2157' }}
            >
              Confirm
            </button>
          </Link>
        
        <div className='policy2' >
          <div className='policy' >
            <p><b>Review your order and address details to avoid cancellations</b></p>

<p><span style={{color:"#fb2157"}}>Note:</span> If you cancel within 60 seconds of placing your order, a 100% refund will be issued.</p>
 <p>No refund for cancellations made after 60 seconds.</p>

<p>Avoid cancellation as it leads to food wastage.</p>

<span style={{color:"#fb2157"}}>Read cancellation policy</span>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default Ncart;

