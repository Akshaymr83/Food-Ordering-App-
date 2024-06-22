
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



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from './Navbar/NAV';
import Footer from './Frontpage/Footer';
import { useParams } from 'react-router-dom';

function OrderHistory() {
  const { id } = useParams();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cartData/${id}`); // Fetch order history for the specific user
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [id]);

  return (
    <div style={{ marginTop: '5rem' }}>
      <NAV />
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
        <table className="table" style={{ marginLeft: '12rem', borderRadius: '10px' }}>
          <thead>
            <tr>
              <th>Food</th>
              <th>Price</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index}>
                <td><b>{order.foodname}</b></td>
                <td><b>{order.price}</b></td>
                <td>
                  <img src={`http://localhost:4000/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default OrderHistory;

