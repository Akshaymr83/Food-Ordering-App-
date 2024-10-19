// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminNav from '../../Navbar/AdminNav';
// import Sidebar from '../Sidebar/Sidebar';

// function AdminOrder({ userId, socket }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     // Retrieve user name from local storage
//     const storedUserName = localStorage.getItem('userName');
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }

//     if (userId) {
//       axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${userId}`)
//         .then((res) => {
//           setCartItems(res.data.userCollection);
//         })
//         .catch((err) => {
//           console.error("Error fetching user data", err);
//         });

//       axios.get(`https://food-ordering-app-wlwn.onrender.com/cartData/${userId}`)
//         .then((res) => {
//           setCartItems(res.data.cartItems);
//         })
//         .catch((err) => {
//           console.error("Error fetching order history", err);
//         });
//     }
//   }, [userId]);

//   useEffect(() => {
//     socket.on('orderStatusUpdate', (data) => {
//       console.log('Order status updated:', data);
//       // Update order status in the state
//       setCartItems(prevCartItems =>
//         prevCartItems.map(order =>
//           order._id === data.foodId ? { ...order, status: data.status } : order
//         )
//       );
//     });

//     return () => {
//       socket.off('orderStatusUpdate');
//     };
//   }, [socket]);

//   const handleStatusChange = (foodId, status) => {
//     axios.post(`https://food-ordering-app-wlwn.onrender.com/updateOrderStatus/${userId}`, { foodId, status })
//       .then(() => {
//         socket.emit('orderStatusUpdate', { userId, foodId, status });
//         // Update order status in cartItems
//         setCartItems(prevCartItems =>
//           prevCartItems.map(order =>
//             order._id === foodId ? { ...order, status } : order
//           )
//         );
//       })
//       .catch((err) => {
//         console.error('Error updating order status:', err);
//       });
//   };

//   return (
//     <div style={{ marginTop: '5rem' }}>
//       <AdminNav />
//       <Sidebar />
//       <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
//       <table className="table" style={{ marginLeft: '20rem', borderRadius: '10px',width:'75%' }}>
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Food</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((order, index) => (
//             <tr key={index}>
//               <td>{order.name}</td>
//               <td><b>{order.foodname}</b></td>
//               <td><b>{order.price}</b></td>
//               <td>
//                 <img src={`https://food-ordering-app-wlwn.onrender.com/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
//               </td>
//               <td>
//                 <select
//                   value={order.status || 'Pending'}
//                   onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Out for Delivery">Out for Delivery</option>
//                   <option value="Delivered">Delivered</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminOrder;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from '../../Navbar/AdminNav';
import Sidebar from '../Sidebar/Sidebar';

function AdminOrder({ userId, socket }) {
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Retrieve user name from local storage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (userId) {
      // axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${userId}`)
      axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`)
        .then((res) => {
          setUserName(res.data.name);
          setCartItems(res.data.userCollection);
        })
        .catch((err) => {
          console.error("Error fetching user data", err);
        });

      // axios.get(`https://food-ordering-app-wlwn.onrender.com/cartData/${userId}`)
      axios.get(`${process.env.REACT_APP_API_URL}/cartData/${userId}`)
        .then((res) => {
          setCartItems(res.data.cartItems);
        })
        .catch((err) => {
          console.error("Error fetching order history", err);
        });
    }
  }, [userId]);

  useEffect(() => {
    socket.on('orderStatusUpdate', (data) => {
      console.log('Order status updated:', data);
      // Update order status in the state
      setCartItems(prevCartItems =>
        prevCartItems.map(order =>
          order._id === data.foodId ? { ...order, status: data.status } : order
        )
      );
    });

    return () => {
      socket.off('orderStatusUpdate');
    };
  }, [socket]);

  const handleStatusChange = (foodId, status) => {
    // axios.post(`https://food-ordering-app-wlwn.onrender.com/updateOrderStatus/${userId}`, { foodId, status })
    axios.post(`${process.env.REACT_APP_API_URL}/updateOrderStatus/${userId}`, { foodId, status })
      .then(() => {
        socket.emit('orderStatusUpdate', { userId, foodId, status });
        // Update order status in cartItems
        setCartItems(prevCartItems =>
          prevCartItems.map(order =>
            order._id === foodId ? { ...order, status } : order
          )
        );
      })
      .catch((err) => {
        console.error('Error updating order status:', err);
      });
  };

  return (
    <div style={{ marginTop: '5rem' }}>
      <AdminNav />
      <Sidebar />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Order History</h1>
      <table className="table" style={{ marginLeft: '20rem', borderRadius: '10px', width: '75%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Food</th>
            <th>Price</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((order, index) => (
            <tr key={index}>
              <td><b><i>{userName}</i></b></td>
              <td><b>{order.foodname}</b></td>
              <td><b>{order.price}</b></td>
              <td>
                {/* <img src={`https://food-ordering-app-wlwn.onrender.com/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} /> */}
                <img src={`${process.env.REACT_APP_API_URL}/${order.image}`} alt={order.foodname} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              </td>
              <td>
                <select
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrder;
