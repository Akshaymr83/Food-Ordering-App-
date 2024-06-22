
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';

// function Ncart() {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch cart data for the logged-in user
//     axios.get('http://localhost:4000/cartData')
//       .then((res) => {
//         console.log("Cart data received:", res.data);
//         setCartItems(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching cart data:", err);
//       });
//   }, []);

//   const [deliveryCharge, setDeliveryCharge] = useState(0);

//   useEffect(() => {
//     // Calculate delivery charge based on cart items
//     const delivery = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0) * 0.1;
//     setDeliveryCharge(delivery);
//   }, [cartItems]);

//   // Calculate the total price of all food items in the cart
//   const foodTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);

//   const total = foodTotal + deliveryCharge;

//   // Function to handle deleting a cart item
//   const handleDelete = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:4000/deleteCartItem/${itemId}`);
//       // Filter out the deleted item from the cart items state
//       setCartItems(cartItems.filter(item => item._id !== itemId));
//       toast.success('Item deleted successfully');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       toast.error('Failed to delete item');
//     }
//   };

//   return (
//     <div>
//    <NAV  cartItems={cartItems} />
//       <div className="overflow-x-auto" style={{ marginBottom: '10%' }}>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>View Your Ordered Items</h1>
//         <table className="table" id='cartTable'>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>availability</th>
//               <th>Remove</th> 
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle w-12 h-12">
//                         <img src={`http://localhost:4000/${item.image}`} alt={item.foodname} style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{item.foodname}</td>
//                 <td>{item.price}</td>
//                 <td ><p>{item.availability ? 'Available' : 'Not Available'}</p></td>
                
//                 <td>
//                   <button style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', border: 'none', borderRadius: '10px', width: '38%',  backgroundColor: '#fb2157' }}  onClick={() => handleDelete(item._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td></td>
//               <td>Food Total:</td>
//               <td>{foodTotal}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Delivery Charge:</td>
//               <td>{deliveryCharge}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Overall Total:</td>
//               <td>{total}</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//         <div style={{ paddingTop: '5%' }}>
//           <Link to={`/payment/${id}`} state={{ total }}>
//             <button style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', border: 'none', borderRadius: '10px', width: '17%', marginLeft: '40%', backgroundColor: '#fb2157' }} alt=''>
//               Confirm
//             </button>
//           </Link>
//         </div>
        
//         <Footer />
//       </div>
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// }

// export default Ncart;
// // src/components/Ncart.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';

// function Ncart({ userId }) {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch cart data for the logged-in user
//     axios.get(`http://localhost:4000/cartData/${userId}`)
//       .then((res) => {
//         console.log("Cart data received:", res.data);
//         setCartItems(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching cart data:", err);
//       });
//   }, [userId]);

//   const [deliveryCharge, setDeliveryCharge] = useState(0);

//   useEffect(() => {
//     // Calculate delivery charge based on cart items
//     const delivery = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0) * 0.1;
//     setDeliveryCharge(delivery);
//   }, [cartItems]);

//   // Calculate the total price of all food items in the cart
//   const foodTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);

//   const total = foodTotal + deliveryCharge;

//   // Function to handle deleting a cart item
//   const handleDelete = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:4000/deleteCartItem/${userId}/${itemId}`);
//       // Filter out the deleted item from the cart items state
//       setCartItems(cartItems.filter(item => item._id !== itemId));
//       toast.success('Item deleted successfully');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       toast.error('Failed to delete item');
//     }
//   };


//   return (
//     <div>
//    <NAV  cartItems={cartItems} />
//       <div className="overflow-x-auto" style={{ marginBottom: '10%' }}>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>View Your Ordered Items</h1>
//         <table className="table" id='cartTable'>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>availability</th>
//               <th>Remove</th> 
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle w-12 h-12">
//                         <img src={`http://localhost:4000/${item.image}`} alt={item.foodname} style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{item.foodname}</td>
//                 <td>{item.price}</td>
//                 <td ><p>{item.availability ? 'Available' : 'Not Available'}</p></td>
//                 <td>
//                   <button style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', border: 'none', borderRadius: '10px', width: '38%',  backgroundColor: '#fb2157' }}  onClick={() => handleDelete(item._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td></td>
//               <td>Food Total:</td>
//               <td>{foodTotal}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Delivery Charge:</td>
//               <td>{deliveryCharge}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Overall Total:</td>
//               <td>{total}</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//         <div style={{ paddingTop: '5%' }}>
//           <Link to={`/payment/${id}`} state={{ total }}>
//             <button style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', border: 'none', borderRadius: '10px', width: '17%', marginLeft: '40%', backgroundColor: '#fb2157' }} alt=''>
//               Confirm
//             </button>
//           </Link>
//         </div>
        
//         <Footer />
//       </div>
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// }

// export default Ncart;
// // src/components/Ncart.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NAV from './Navbar/NAV';
// import Footer from './Frontpage/Footer';

// function Ncart() {
//   const [cartItems, setCartItems] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch cart data for the logged-in user
//     axios.get('http://localhost:4000/cartData')
//       .then((res) => {
//         console.log("Cart data received:", res.data);
//         setCartItems(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching cart data:", err);
//       });
//   }, []);

//   const [deliveryCharge, setDeliveryCharge] = useState(0);

//   useEffect(() => {
//     // Calculate delivery charge based on cart items
//     const delivery = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0) * 0.1;
//     setDeliveryCharge(delivery);
//   }, [cartItems]);

//   // Calculate the total price of all food items in the cart
//   const foodTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);

//   const total = foodTotal + deliveryCharge;

//   // Function to handle deleting a cart item
//   const handleDelete = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:4000/deleteCartItem/${itemId}`);
//       // Filter out the deleted item from the cart items state
//       setCartItems(cartItems.filter(item => item._id !== itemId));
//       toast.success('Item deleted successfully');
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       toast.error('Failed to delete item');
//     }
//   };

//   return (
//     <div>
//       <NAV cartItems={cartItems} />
//       <div className="overflow-x-auto" style={{ marginBottom: '10%' }}>
//         <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>View Your Ordered Items</h1>
//         <table className="table" id='cartTable'>
//           <thead>
//             <tr>
//               <th>Food</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Availability</th>
//               <th>Remove</th> 
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="mask mask-squircle w-12 h-12">
//                         <img src={`http://localhost:4000/${item.image}`} alt={item.foodname} style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{item.foodname}</td>
//                 <td>{item.price}</td>
//                 <td><p>{item.availability}</p></td>
//                 <td>
//                   <button 
//                     style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '38%', backgroundColor: '#fb2157' }}
//                     onClick={() => handleDelete(item._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td></td>
//               <td>Food Total:</td>
//               <td>{foodTotal}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Delivery Charge:</td>
//               <td>{deliveryCharge}</td>
//               <td></td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>Overall Total:</td>
//               <td>{total}</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//         <div style={{ paddingTop: '5%' }}>
//           <Link to={`/payment/${id}`} state={{ total }}>
//             <button 
//               style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '17%', marginLeft: '40%', backgroundColor: '#fb2157' }}
//             >
//               Confirm
//             </button>
//           </Link>
//         </div>
//         <Footer />
//       </div>
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </div>
//   );
// }

// export default Ncart;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NAV from './Navbar/NAV';
import Footer from './Frontpage/Footer';

function Ncart() {
    const [cartItems, setCartItems] = useState([]);
    const { id } = useParams();
    const url =`http://localhost:4000/user/${id}`;
    useEffect(() => {
      // Fetch cart data for the logged-in user
      axios.get(url)
        .then((res) => {
          console.log("Cart data received:", res.data);
          setCartItems(res.data.userCollection);
        })
        .catch((err) => {
          console.log("Error fetching cart data:", err);
        });
    }, id);

    const [deliveryCharge, setDeliveryCharge] = useState(0);

    useEffect(() => {
        // Calculate delivery charge based on cart items
        const delivery = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0) * 0.1;
        setDeliveryCharge(delivery);
    }, [cartItems]);

    // Calculate the total price of all food items in the cart
    const foodTotal = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);

    const total = foodTotal + deliveryCharge;

    // Function to handle deleting a cart item
    const handleDelete = async (itemId) => {
        try {
          await axios.delete(`http://localhost:4000/removeFromCart/${id}/${itemId}`); // Corrected API endpoint
      
          toast.success('Item deleted successfully');
          // Update the cartItems state after deletion
          setCartItems(cartItems.filter(item => item._id !== itemId));
        } catch (error) {
          console.error('Error deleting item:', error); // Log the actual error message
          toast.error('Failed to delete item');
        }
      };

    return (
        <div>
            <NAV cartItems={cartItems} />
            <div className="overflow-x-auto" style={{ marginBottom: '10%' }}>
                <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>View Your Ordered Items</h1>
                <table className="table" id='cartTable'>
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={`http://localhost:4000/${item.image}`} alt={item.foodname} style={{ height: '100px', width: '100px', objectFit: 'contain' }} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.foodname}</td>
                                <td>{item.price}</td>
                                <td>{item.availability === "Available" ? "Available" : "Not Available"}</td>
                                <td>
                                    <button
                                        style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '38%', backgroundColor: '#fb2157' }}
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td>Food Total:</td>
                            <td>{foodTotal}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Delivery Charge:</td>
                            <td>{deliveryCharge}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Overall Total:</td>
                            <td>{total}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ paddingTop: '5%' }}>
                    <Link to={`/payment/${id}`} state={{ total }}>
                        <button
                            style={{ textDecoration: 'none', border: 'none', fontWeight: '500', padding: '6px', background: 'white', color: 'white', borderRadius: '10px', width: '17%', marginLeft: '40%', backgroundColor: '#fb2157' }}
                        >
                            Confirm
                        </button>
                    </Link>
                </div>
                <Footer />
            </div>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default Ncart;
