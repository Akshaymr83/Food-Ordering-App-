
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

// function OrderHistory() {
//   const { id } = useParams();
//   const [orderHistory, setOrderHistory] = useState([]);

//   useEffect(() => {
//     const fetchOrderHistory = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/cartData`);
//         setOrderHistory(response.data);
//       } catch (error) {
//         console.error('Error fetching order history:', error);
//       }
//     };

//     fetchOrderHistory();

//     // Listen for order status updates from WebSocket
//     socket.on('orderStatusUpdated', ({ orderId, status }) => {
//       setOrderHistory(prevOrders => prevOrders.map(order => {
//         if (order._id === orderId) {
//           return { ...order, status };
//         }
//         return order;
//       }));
//     });

//     return () => {
//       // Cleanup socket connection when component unmounts
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <NAV />
//       <div>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
//         <table className="table" style={{ marginLeft: '12rem', borderRadius: '10px' }}>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderHistory.map((order, index) => (
//               <tr key={index}>
//                 <td><b>{order.foodname}</b></td>
//                 <td><b>{order.price}</b></td>
//                 <td>
//                   <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//                 </td>
//                 <td>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default OrderHistory;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

// function OrderHistory() {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams(); // Assuming id here refers to the userId
//   const userUrl = `http://localhost:4000/user/${id}`;

//   useEffect(() => {
//     axios.get(userUrl)
//       .then((res) => {
//         setCartItems(res.data.userCollection);
//         localStorage.setItem('orderHistory', JSON.stringify(res.data.userCollection));
//       })
//       .catch((err) => {
//         console.log("Error in order history", err);
//       });

//     socket.on('orderStatusUpdate', (data) => {
//       setCartItems(prevItems => prevItems.map(item => item._id === data.foodId ? { ...item, status: data.status } : item));
//     });

//     return () => {
//       socket.off('orderStatusUpdate');
//     };
//   }, [id]);

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <NAV />
//       <div>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
//         <table className="table" style={{ marginLeft: '12rem', borderRadius: '10px' }}>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((order, index) => (
//               <tr key={index}>
//                 <td><b>{order.foodname}</b></td>
//                 <td><b>{order.price}</b></td>
//                 <td>
//                   <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//                 </td>
//                 <td>{order.status || 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default OrderHistory;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

// function OrderHistory() {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams(); // Assuming id here refers to the userId
//   const userUrl = `http://localhost:4000/user/${id}`;

//   useEffect(() => {
//     axios.get(userUrl)
//       .then((res) => {
//         setCartItems(res.data.userCollection);
//         localStorage.setItem('orderHistory', JSON.stringify(res.data.userCollection));
//       })
//       .catch((err) => {
//         console.log("Error in order history", err);
//       });

//     socket.on('orderStatusUpdate', (data) => {
//       setCartItems(prevItems => prevItems.map(item => item._id === data.foodId ? { ...item, status: data.status } : item));
//     });

//     return () => {
//       socket.off('orderStatusUpdate');
//     };
//   }, [id]);

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <NAV />
     
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
//         <div style={{ overflowX: 'auto',paddingLeft:"4rem",paddingRight:"4rem" }}>
//           <table className="table" style={{ width: '100%', borderRadius: '10px' }}>
//             <thead>
//               <tr>
//                 <th>Food</th>
//                 <th>Price</th>
//                 <th>Image</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((order, index) => {
//                 const currentDate = new Date();
//                 return (
//                   <tr key={index}>
//                     <td><b>{order.foodname}</b></td>
//                     <td><b>{order.price}</b></td>
//                     <td>
//                       <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//                     </td>
//                     <td>{order.status || 'Pending'}</td>
//                     <td>{currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div style={{marginTop:'2rem',padding:'4rem',textAlign:'center'}}>
//         <b><h3  ><b>Customer Support</b></h3></b><br></br>
// <p>Need help with an order? Contact our <span style={{color:'#fb2157'}}>Customer Support team for assistance.</span></p> 
// <p>We’re here to ensure you have the best experience possible.
// </p>
// <p><h5><b>Thank you for choosing <span style={{color:'#fb2157'}}>FOOD-MOOD </span>.Your satisfaction is our top priority.</b></h5></p>
//         </div>
  
//       <Footer />
//     </div>
//   );
// }

// export default OrderHistory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from './Navbar/NAV';
import Footer from './Frontpage/Footer';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:4000');

function OrderHistory() {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams(); // Assuming id here refers to the userId
  const userUrl = `http://localhost:4000/user/${id}`;

  useEffect(() => {
    axios.get(userUrl)
      .then((res) => {
        setCartItems(res.data.userCollection);
        localStorage.setItem('orderHistory', JSON.stringify(res.data.userCollection));
      })
      .catch((err) => {
        console.log("Error in order history", err);
      });

    socket.on('orderStatusUpdate', (data) => {
      setCartItems(prevItems => prevItems.map(item => item._id === data.foodId ? { ...item, status: data.status } : item));
    });

    return () => {
      socket.off('orderStatusUpdate');
    };
  }, [id]);
  const handleDelete = async (cartItemId) => {
    try {
      // Delete item from backend
      const itemToDelete = cartItems.find(item => item.cartItemId === cartItemId);
      await axios.delete(`http://localhost:4000/removeFromCart/${id}/${itemToDelete._id}`);
      alert("Click ok to Confirm the Cancelation.Our Team will contact you")
      toast.success('Item Canceled successfully,Refund will be done within 24 hours',);
      // Update local state after deletion
      setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };


  return (
    <div style={{ marginTop: '5rem' }}>
      <NAV />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
      <div style={{ overflowX: 'auto', paddingLeft: "4rem", paddingRight: "4rem" }}>
        <table className="table" style={{ width: '100%', borderRadius: '10px' }}>
          <thead>
            <tr>
              <th>Food</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((order, index) => {
              const currentDate = new Date();
              return (
                <tr key={index}>
                  <td><b>{order.foodname}</b></td>
                  <td><b>{order.price}</b></td>
                  <td>
                    <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                  </td>
                  <td>{order.status || 'Pending'}</td>
                  <td>{currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}</td>
                  <td>
                  <button
                    style={{ textDecoration: 'none', border: 'none',fontsize:'10px', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '38%', backgroundColor: '#fb2157' }}
                    onClick={() => handleDelete(order.cartItemId)}
                  >
                   Cancel Order
                  </button>
                </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '2rem', padding: '4rem', textAlign: 'center' }}>
        <h3><b>Customer Support</b></h3><br />
        <p>Need help with an order? Contact our <span style={{ color: '#fb2157' }}>Customer Support team for assistance.</span></p>
        <p>We’re here to ensure you have the best experience possible.</p>
        <p><h5><b>Thank you for choosing <span style={{ color: '#fb2157' }}>FOOD-MOOD</span>. Your satisfaction is our top priority.</b></h5></p>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default OrderHistory;


