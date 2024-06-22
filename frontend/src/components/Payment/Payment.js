// import '../Payment/payment.css';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import NAV from '../Navbar/NAV';
// import Footer from '../Frontpage/Footer';
// import visa from "../../components/Images/visa.png";

// function Payment() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [payData, setPayData] = useState({
//     name: '',
//     address: '',
//     total: location.state ? location.state.total : 0, // Accessing total from location state
//     place: ''
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });

//   const [showLoader, setShowLoader] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/user/${id}`);
//         const userData = response.data;
//         setFormData(prevState => ({
//           ...prevState,
//           email: userData.email,
//           name: userData.name
//         }));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     fetchUserData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue = name === 'total' ? parseFloat(value) : value;
//     setFormData({ ...formData, [name]: value });
//     setPayData({ ...payData, [name]: parsedValue });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!payData.name || !payData.address || !payData.total || !payData.place) {
//       alert('Fill all forms');
//       return;
//     }
//     try {
//       setShowLoader(true);
//       await axios.post("http://localhost:4000/payment", payData);
//       console.log("Payment added successfully");
//       alert('Payment added successfully');
//       setTimeout(() => {
//         setShowLoader(false);
//         setPaymentSuccess(true);
//         setTimeout(() => {
//           navigate(`/orderhistory/${id}`);
//         }, 3000);
//       }, 3000);
//     } catch (error) {
//       console.error('Error adding payment details:', error);
//       alert('Error adding payment details');
//       setShowLoader(false);
//     }
//   };

//   return (
//     <>
//     <NAV/>
//     <div className="containerr" style={{ marginTop: '5rem' }}>
//       {showLoader ? (
//         <div className="loader-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
//           <div className="loader" style={{ border: '16px solid #f3f3f3', borderTop: '16px solid #3498db', borderRadius: '50%', width: '120px', height: '120px', animation: 'spin 2s linear infinite', margin: 'auto' }}></div>
//           <p style={{ marginTop: '1rem', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>Processing Payment...</p>
//         </div>
//       ) : paymentSuccess ? (
//         <div className="success-message" style={{ textAlign: 'center', marginTop: '2rem' }}>
//           <p style={{ color: 'green', fontSize: '1.2rem', fontWeight: 'bold' }}>Payment Successful!</p>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} action="">
//           <div className="row">
//             <div className="col">
//               <h3 className="title" style={{ fontWeight: '600' }}>Billing Address</h3>
//               <div className="inputBox">
//                 <span className='spanPayment'>Full Name :</span>
//                 <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleChange} />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Email :</span>
//                 <input type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Address :</span>
//                 <input type="text" placeholder="Address...." name="address" value={payData.address} onChange={handleChange} />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>City :</span>
//                 <input type="text" placeholder="City" name="place" value={payData.place} onChange={handleChange} />
//               </div>
//               <div className="flex">
//                 <div className="inputBox">
//                   <span className='spanPayment'>State :</span>
//                   <input type="text" placeholder="State" />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Zip Code :</span>
//                   <input type="text" placeholder="Zip Code" />
//                 </div>
//               </div>
//             </div>
//             <div className="col">
//               <h3 className="title" style={{ fontWeight: '600' }}>Payment</h3>
//               <div className="inputBox">
//                 <span className='spanPayment'>Total Amount :</span>
//                 <input
//             type="text"
//             name="total"
//             value={payData.total}
//             onChange={handleChange}
//             readOnly
//           />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Cards Accepted :</span>
//                 <img src={visa} alt="Visa" />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Name on Card :</span>
//                 <input type="text" placeholder="Name" name="name" value={payData.name} onChange={handleChange} />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Credit Card Number :</span>
//                 <input type="number" placeholder="1111-2222-3333-4444" />
//               </div>
//               <div className="inputBox">
//                 <span className='spanPayment'>Expiration Month :</span>
//                 <input type="text" placeholder="Month" />
//               </div>
//               <div className="flex">
//                 <div className="inputBox">
//                   <span className='spanPayment'>Expiration Year :</span>
//                   <input type="number" placeholder="2022" />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>CVV :</span>
//                   <input type="text" placeholder="1234" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button type="submit" className="submit-btn" onClick={handleSubmit}>Proceed to Checkout</button>
//         </form>
//       )}
//     </div>
//     <Footer/>
//     </>
//   );
// }

// export default Payment;
// PaymentForm.js
// src/components/Payment/PaymentForm.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// function PaymentForm({ total }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const { paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//       });

//       const response = await axios.post('http://localhost:4000/processPayment', {
//         amount: total * 100, // Convert amount to cents
//         paymentMethodId: paymentMethod.id,
//       });

//       console.log('Payment successful:', response.data);
//       // Handle successful payment (e.g., show a success message or redirect)
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       // Handle payment error (e.g., show an error message)
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || loading}>
//         {loading ? 'Processing...' : 'Pay'}
//       </button>
//     </form>
//   );
// }

// export default PaymentForm;
// import '../Payment/payment.css';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import NAV from '../Navbar/NAV';
// import Footer from '../Frontpage/Footer';
// import visa from "../../components/Images/visa.png";

// function Payment() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [payData, setPayData] = useState({
//     name: '',
//     address: '',
//     total: location.state ? location.state.total : 0,
//     place: ''
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });

//   const [showLoader, setShowLoader] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [discountedTotal, setDiscountedTotal] = useState(payData.total);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/user/${id}`);
//         const userData = response.data;
//         setFormData(prevState => ({
//           ...prevState,
//           email: userData.email,
//           name: userData.name
//         }));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parsedValue = name === 'total' ? parseFloat(value) : value;
//     setFormData({ ...formData, [name]: value });
//     setPayData({ ...payData, [name]: parsedValue });
//   };

//   const applyDiscount = (percentage) => {
//     const discount = payData.total * (percentage / 100);
//     setDiscountedTotal(payData.total - discount);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!payData.name || !payData.address || !payData.total || !payData.place) {
//       alert('Fill all forms');
//       return;
//     }
//     try {
//       setShowLoader(true);
//       await axios.post("http://localhost:4000/payment", { ...payData, total: discountedTotal });
//       console.log("Payment added successfully");
//       alert('Payment added successfully');
//       setTimeout(() => {
//         setShowLoader(false);
//         setPaymentSuccess(true);
//         setTimeout(() => {
//           navigate(`/orderhistory/${id}`);
//         }, 3000);
//       }, 3000);
//     } catch (error) {
//       console.error('Error adding payment details:', error);
//       alert('Error adding payment details');
//       setShowLoader(false);
//     }
//   };

//   return (
//     <>
//       <NAV />
//       <div className="containerr" style={{ marginTop: '5rem' }}>
//         {showLoader ? (
//           <div className="loader-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
//             <div className="loader" style={{ border: '16px solid #f3f3f3', borderTop: '16px solid #3498db', borderRadius: '50%', width: '120px', height: '120px', animation: 'spin 2s linear infinite', margin: 'auto' }}></div>
//             <p style={{ marginTop: '1rem', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>Processing Payment...</p>
//           </div>
//         ) : paymentSuccess ? (
//           <div className="success-message" style={{ textAlign: 'center', marginTop: '2rem' }}>
//             <p style={{ color: 'green', fontSize: '1.2rem', fontWeight: 'bold' }}>Payment Successful!</p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} action="">
//             <div className="row">
//               <div className="col">
//                 <h3 className="title" style={{ fontWeight: '600' }}>Billing Address</h3>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Full Name :</span>
//                   <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleChange} />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Email :</span>
//                   <input type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleChange} />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Address :</span>
//                   <input type="text" placeholder="Address...." name="address" value={payData.address} onChange={handleChange} />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>City :</span>
//                   <input type="text" placeholder="City" name="place" value={payData.place} onChange={handleChange} />
//                 </div>
//                 <div className="flex">
//                   <div className="inputBox">
//                     <span className='spanPayment'>State :</span>
//                     <input type="text" placeholder="State" />
//                   </div>
//                   <div className="inputBox">
//                     <span className='spanPayment'>Zip Code :</span>
//                     <input type="text" placeholder="Zip Code" />
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <h3 className="title" style={{ fontWeight: '600' }}>Payment</h3>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Total Amount :</span>
//                   <input
//                     type="text"
//                     name="total"
//                     value={discountedTotal}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Cards Accepted :</span>
//                   <img src={visa} alt="Visa" />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Name on Card :</span>
//                   <input type="text" placeholder="Name" name="name" value={payData.name} onChange={handleChange} />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Credit Card Number :</span>
//                   <input type="number" placeholder="1111-2222-3333-4444" />
//                 </div>
//                 <div className="inputBox">
//                   <span className='spanPayment'>Expiration Month :</span>
//                   <input type="text" placeholder="Month" />
//                 </div>
//                 <div className="flex">
//                   <div className="inputBox">
//                     <span className='spanPayment'>Expiration Year :</span>
//                     <input type="number" placeholder="2022" />
//                   </div>
//                   <div className="inputBox">
//                     <span className='spanPayment'>CVV :</span>
//                     <input type="text" placeholder="1234" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="discount-buttons" style={{ marginTop: '1rem', textAlign: 'center' ,display:'flex',justifyContent:'space-around',marginBottom:'10px' }}>
//               <button type="button" className="discount-btn" onClick={() => applyDiscount(5)}> <b>Bank Offer</b><br></br>Enjoy a 5% discount when you pay with select banks. Save more on your next purchase!</button>
//               <button type="button" className="discount-btn" onClick={() => applyDiscount(10)}><b>Seasonal Offer</b><br></br>As a token of our appreciation, here's a 10% discount for our loyal customers. Thank you for your continued support!</button>
//               <button type="button" className="discount-btn" onClick={() => applyDiscount(20)}><b>First Order Discount</b> <br></br>Welcome to our store! Get a 20%% discount on your first order. Enjoy your shopping experience with us!</button>
//             </div>
//             <button type="submit" className="submit-btn" onClick={handleSubmit}>Proceed to Checkout</button>
//           </form>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Payment;
// import '../Payment/payment.css';


//////////////////////RAZOR PAY///////////////////////////
// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import NAV from '../Navbar/NAV';
// import Footer from '../Frontpage/Footer';

// function Payment() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const paymentHandler = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/orderPay", {
//         method: "POST",
//         body: JSON.stringify({
//           amount: 500, // The amount in smallest currency unit
//           currency: "INR",
//           receipt: "receipt#1",
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const order = await response.json();
//       console.log(order);

//       if (order.id) {
//         const options = {
//           key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//           amount: order.amount,
//           currency: order.currency,
//           name: "Your Company Name",
//           description: "Test Transaction",
//           order_id: order.id,
//           handler: function (response) {
//             console.log(response);
//             alert("Payment Successful!");
//             navigate(`/orderhistory/${id}`);
//           },
//           prefill: {
//             name: "John Doe",
//             email: "john.doe@example.com",
//             contact: "7293065273"
//           },
//           notes: {
//             address: "Corporate Office"
//           },
//           theme: {
//             color: "#3399cc"
//           }
//         };

//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       } else {
//         alert("Order creation failed");
//       }
//     } catch (error) {
//       console.error('Error during payment:', error);
//       alert('Error during payment');
//     }
//   };

//   return (
//     <>
//       <NAV />
//       <div className="container" style={{ marginTop: '5rem' }}>
//         <div>
//           <h2>T-Shirt</h2>
//           <button onClick={paymentHandler}>Pay</button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Payment;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NAV from '../Navbar/NAV';
import Footer from '../Frontpage/Footer';
import visa from "../../components/Images/visa.png";
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import "./payment.css"
import { Link } from 'react-router-dom';

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [payData, setPayData] = useState({
    name: '',
    address: '',
    total: location.state ? location.state.total : 0,
    place: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [showLoader, setShowLoader] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(payData.total);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        setFormData(prevState => ({
          ...prevState,
          email: userData.email,
          name: userData.name
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'total' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: value });
    setPayData({ ...payData, [name]: parsedValue });
  };

  const applyDiscount = (percentage) => {
    const discount = payData.total * (percentage / 100);
    setDiscountedTotal(payData.total - discount);
    alert("Discount Applied")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payData.name || !payData.address || !payData.total || !payData.place) {
      alert('Fill all forms');
      return;
    }
    try {
      setShowLoader(true);
      await axios.post("http://localhost:4000/payment", { ...payData, total: discountedTotal });
      const response = await axios.post("http://localhost:4000/orderPay", {
        amount: discountedTotal, // Use the discounted total amount
        currency: "INR", // Set the currency
        receipt: "receipt#1", // Set the receipt ID
      });

      const order = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "FOOD MOOD App",
        description: "Test Transaction",
        order_id: order.id,
        handler: function (response) {
          console.log(response);
          alert("Payment Successful!");
          setPaymentSuccess(true);
          // Redirect to receipt page or stay here to download/print receipt
        },
        prefill: {
          name: payData.name,
          email: formData.email,
          contact: "7293065273", // Set the contact number if needed
        },
        notes: {
          address: payData.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Error during payment');
    } finally {
      setShowLoader(false);
    }
  };

  // const printReceipt = () => {
  //   window.print();
  // };

  const downloadReceiptAsPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDFnpm install jspdf

    doc.text("FOOD MOOD", 10, 10);
    doc.text("Payment Receipt", 10, 20);
    doc.text(`Name: ${payData.name}`, 10, 30);
    doc.text(`Email: ${formData.email}`, 10, 40);
    doc.text(`Address: ${payData.address}`, 10, 50);
    doc.text(`Total Amount: ${discountedTotal}`, 10, 60);
    doc.text("PAYMENT SUCESSFULL ", 10, 70);
    doc.text("THANK YOU", 10, 80);

    // Save the PDF
    doc.save("receipt.pdf");
  };

  return (
    <>
      <NAV />
      <div className="containerr" style={{ marginTop: '5rem' }}>
        {showLoader ? (
          <div className="loader-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div className="loader" style={{ border: '16px solid #f3f3f3', borderTop: '16px solid #3498db', borderRadius: '50%', width: '120px', height: '120px', animation: 'spin 2s linear infinite', margin: 'auto' }}></div>
            <p style={{ marginTop: '1rem', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>Processing Payment...</p>
          </div>
        ) : paymentSuccess ? (
          <div className="success-message" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: 'green', fontSize: '1.2rem', fontWeight: 'bold' }}>Payment Successful!</p>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              {/* <button className="btn" onClick={printReceipt}>Print Receipt</button> */}
              <button className="btn" onClick={downloadReceiptAsPDF}>Download Receipt</button><br></br><br></br>
              
        <Link to ={`/orderHistory/${id}`}>   <button className="btn" >Order History</button></Link> <br></br><br></br> 
 
        <Link to ={`/frontpage/${id}`}>   <button className="btn" >Go to Home</button></Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} action="">
            <div className="row">
              <div className="col">
                <h3 className="title" style={{ fontWeight: '600' }}>Billing Address</h3>
                <div className="inputBox">
                  <span className='spanPayment'>Full Name :</span>
                  <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Email :</span>
                  <input type="email" placeholder="example@example.com" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Address :</span>
                  <input type="text" placeholder="Address...." name="address" value={payData.address} onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>City :</span>
                  <input type="text" placeholder="City" name="place" value={payData.place} onChange={handleChange} />
                </div>
                <div className="flex">
                  <div className="inputBox">
                    <span className='spanPayment'>State :</span>
                    <input type="text" placeholder="State" />
                  </div>
                  <div className="inputBox">
                    <span className='spanPayment'>Zip Code :</span>
                    <input type="text" placeholder="Zip Code" />
                  </div>
                </div>
              </div>
              <div className="col">
                <h3 className="title" style={{ fontWeight: '600' }}>Payment</h3>
                <div className="inputBox">
                  <span className='spanPayment'>Total Amount :</span>
                  <input
                    type="text"
                    name="total"
                    value={discountedTotal}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Cards Accepted :</span>
                  <img src={visa} alt="Visa" />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Name on Card :</span>
                  <input type="text" placeholder="Name" name="name" value={payData.name} onChange={handleChange} />
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Credit Card Number :</span>
                  <input type="text" placeholder="1111-2222-3333-4444" maxLength="12"/>
                </div>
                <div className="inputBox">
                  <span className='spanPayment'>Expiration Month :</span>
                  <input type="text" placeholder="Month"  maxLength="2" />
                </div>
                <div className="flex">
                  <div className="inputBox">
                    <span className='spanPayment'>Expiration Year :</span>
                    <input type="text" placeholder="2022" maxLength="4" />
                  </div>
                  <div className="inputBox">
                    <span className='spanPayment'>CVV :</span>
                    <input type="text" placeholder="1234" maxLength="3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="discount-buttons" style={{ marginTop: '1rem', textAlign: 'center' ,display:'flex',justifyContent:'space-around',marginBottom:'10px' }}>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(5)}> <b>Bank Offer</b><br></br>Enjoy a 5% discount when you pay with select banks. Save more on your next purchase!</button>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(10)}><b>Seasonal Offer</b><br></br>As a token of our appreciation, here's a 10% discount for our loyal customers. Thank you for your continued support!</button>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(20)}><b>First Order Discount</b> <br></br>Welcome to our store! Get a 20%% discount on your first order. Enjoy your shopping experience with us!</button>
            </div>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>Proceed to Checkout</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Payment;