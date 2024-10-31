

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const socket = io(process.env.REACT_APP_API_URL, { autoConnect: false });

// function OrderHistory() {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams(); // Assuming `id` refers to the userId
//   const userUrl = `${process.env.REACT_APP_API_URL}/user/${id}`;

//   useEffect(() => {
//     // Connect socket and join user room
//     if (!socket.connected) socket.connect();
//     socket.emit('joinRoom', id);

//     axios.get(userUrl)
//       .then((res) => {
//         setCartItems(res.data.userCollection);
//         localStorage.setItem('orderHistory', JSON.stringify(res.data.userCollection));
//       })
//       .catch((err) => {
//         console.error("Error in order history", err);
//       });

//     // Listen to order status updates
//     socket.on('orderStatusUpdate', (data) => {
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item._id === data.foodId ? { ...item, status: data.status } : item
//         )
//       );
//     });

//     // Clean up socket listener on unmount
//     return () => {
//       socket.off('orderStatusUpdate');
//     };
//   }, [id]);

//   // Handle order cancellation
//   const handleDelete = async (cartItemId) => {
//     try {
//       const itemToDelete = cartItems.find(item => item.cartItemId === cartItemId);
//       await axios.delete(`${process.env.REACT_APP_API_URL}/removeFromCart/${id}/${itemToDelete._id}`);
//       setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
//       toast.success('Item Canceled successfully. Refund will be done within 24 hours.');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       toast.error('Failed to delete item');
//     }
//   };

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <NAV />
//       <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
//       <div style={{ overflowX: 'auto', paddingLeft: "4rem", paddingRight: "4rem" }}>
//         <table className="table" style={{ width: '100%', borderRadius: '10px' }}>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Price</th>
//               <th>Image</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((order, index) => {
//               const currentDate = new Date();
//               return (
//                 <tr key={index}>
//                   <td><b>{order.foodname}</b></td>
//                   <td><b>{order.price}</b></td>
//                   <td>
//                     <img src={`${process.env.REACT_APP_API_URL}/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//                   </td>
//                   <td>{order.status || 'Pending'}</td>
//                   <td>{currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}</td>
//                   <td>
//                     <button
//                       style={{ textDecoration: 'none', border: 'none',fontsize:'10px', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '38%', backgroundColor: '#fb2157' }}
                      
//                       onClick={() => handleDelete(order.cartItemId)}
//                     >
//                      <i className="fa-solid fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div style={{ marginTop: '2rem', padding: '4rem', textAlign: 'center' }}>
//         <h3><b>Customer Support</b></h3><br />
//         <p>Need help with an order? Contact our <span style={{ color: '#fb2157' }}>Customer Support team for assistance.</span></p>
//         <p>We’re here to ensure you have the best experience possible.</p>
//         <h5><b>Thank you for choosing <span style={{ color: '#fb2157' }}>FOOD-MOOD</span>. Your satisfaction is our top priority.</b></h5>
//       </div>
//       <Footer />
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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

const socket = io(process.env.REACT_APP_API_URL, { autoConnect: false });

function OrderHistory() {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams(); // Assuming `id` refers to the userId
  const userUrl = `${process.env.REACT_APP_API_URL}/user/${id}`;

  useEffect(() => {
    // Connect socket and join user room
    if (!socket.connected) socket.connect();
    socket.emit('joinRoom', id);

    const fetchUserOrders = async () => {
      try {
        const res = await axios.get(userUrl);
        const fetchedOrders = res.data.userCollection;
        
        // Load last known order status from localStorage if exists
        const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        
        const updatedOrders = fetchedOrders.map(order => {
          // Find stored status for each order and apply it
          const storedOrder = storedOrders.find(stored => stored._id === order._id);
          return { ...order, status: storedOrder ? storedOrder.status : order.status };
        });
        
        // Set cart items and save updated orders to localStorage
        setCartItems(updatedOrders);
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
      } catch (err) {
        console.error("Error fetching order history, using localStorage as fallback", err);
        
        // Retrieve from local storage if API call fails
        const storedOrders = localStorage.getItem('orderHistory');
        if (storedOrders) {
          setCartItems(JSON.parse(storedOrders));
        }
      }
    };

    // Fetch orders initially
    fetchUserOrders();

    // Listen to order status updates
    socket.on('orderStatusUpdate', (data) => {
      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item._id === data.foodId ? { ...item, status: data.status } : item
        );

        // Update localStorage with new order status
        localStorage.setItem('orderHistory', JSON.stringify(updatedItems));

        return updatedItems;
      });
    });

    // Clean up socket listener on unmount
    return () => {
      socket.off('orderStatusUpdate');
    };
  }, [id]);

  // Handle order cancellation
  const handleDelete = async (cartItemId) => {
    try {
      const itemToDelete = cartItems.find(item => item.cartItemId === cartItemId);
      await axios.delete(`${process.env.REACT_APP_API_URL}/removeFromCart/${id}/${itemToDelete._id}`);
      const updatedCartItems = cartItems.filter(item => item.cartItemId !== cartItemId);
      setCartItems(updatedCartItems);
      
      // Update localStorage after deletion
      localStorage.setItem('orderHistory', JSON.stringify(updatedCartItems));

      toast.success('Item Canceled successfully. Refund will be done within 24 hours.');
      window.location.reload()
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
                    <img src={`${process.env.REACT_APP_API_URL}/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                  </td>
                  <td>{order.status || 'Pending'}</td>
                  <td>{currentDate.toLocaleDateString()} {currentDate.toLocaleTimeString()}</td>
                  <td>
                    <button
                      style={{
                        textDecoration: 'none', border: 'none', background:'none'
                      }}
                      onClick={() => handleDelete(order.cartItemId)}
                    >
                      <i className="fa-solid fa-trash" style={{color:'#fb2157'}}></i>
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
        <h5><b>Thank you for choosing <span style={{ color: '#fb2157' }}>FOOD-MOOD</span>. Your satisfaction is our top priority.</b></h5>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default OrderHistory;
