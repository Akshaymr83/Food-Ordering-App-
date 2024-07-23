
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import NAV from '../Navbar/NAV';
import Footer from '../Frontpage/Footer';
import jsPDF from 'jspdf'; 
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
        const response = await axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${id}`);
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
    if ( !payData.address || !payData.total || !payData.place) {
      alert('Fill all forms');
      return;
    }
    try {
      setShowLoader(true);
      await axios.post("https://food-ordering-app-wlwn.onrender.com/payment", { ...payData, total: discountedTotal });
      const response = await axios.post("https://food-ordering-app-wlwn.onrender.com/orderPay", {
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
      <div className="containerr" style={{ minHeight:'100px',marginTop:'5rem' }}>
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
                  <div className="inputBox">
                  <span className='spanPayment'>Total Amount :</span>
                 <b><input
                    type="text"
                    name="total"
                    value={discountedTotal}
                    onChange={handleChange}
                    readOnly
                  /></b> 
                </div>
                </div>
              </div>
              
            </div>
            <div className="discount-buttons" style={{ marginTop: '1rem', textAlign: 'center' ,display:'flex',justifyContent:'space-around',marginBottom:'10px' }}>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(5)}> <b><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="discount"><path fill="#df1e49" d="m0 17.665 5.422-1.348v6.804L0 24.469l1.944-3.886zM32 7.532 26.578 8.88v6.804L32 14.336l-1.945-2.919z"></path><path fill="#ff1e55" d="M3.987 15.502v6.805l3.692-.918 16.642-4.137 3.692-.918V9.53l-3.692.918-16.642 4.137-3.692.918z"></path><path fill="#fff" d="m23.076 1032.806-1.666.414v.49l.563-.14v2.94l.539-.134v-2.94l.564-.14v-.49zm-1.9.472-.48.12v2.052l-.553-1.914-.678.168v3.43l.486-.121v-2.485l.67 2.319.555-.14v-3.429zm-2.074.516-.51.127v2.646c0 .245-.108.36-.28.403-.171.043-.279-.02-.279-.264v-2.647l-.539.135v2.612c0 .548.274.793.803.662.53-.132.805-.514.805-1.063v-2.611zm-2.4.615c-.102-.013-.22 0-.352.03-.53.13-.819.517-.819 1.065v1.784c0 .548.29.79.819.658.529-.132.818-.516.818-1.065v-1.783c0-.411-.162-.651-.467-.69zm-1.913.475c-.1-.013-.217 0-.35.029-.529.131-.802.513-.802 1.062v1.783c0 .55.273.796.802.664.53-.131.805-.513.805-1.062v-.457l-.51.127v.49c0 .245-.107.36-.279.402-.171.043-.28-.018-.28-.263v-1.852c0-.245.109-.365.28-.408.172-.043.28.025.28.27v.367l.51-.127v-.332c0-.412-.156-.654-.456-.694zm1.676.035c.103.012.164.096.164.279v1.852c0 .245-.108.365-.28.408-.17.043-.279-.025-.279-.27v-1.851c0-.245.108-.366.28-.409a.316.316 0 0 1 .115-.01zm-3.541.43a.85.85 0 0 0-.346.026c-.524.13-.793.512-.793 1.06 0 .98 1.053.85 1.053 1.556 0 .245-.108.361-.28.404-.17.043-.279-.02-.279-.264v-.246l-.51.127v.211c0 .549.274.794.803.662.53-.131.805-.514.805-1.062 0-.98-1.055-.85-1.055-1.555 0-.245.098-.364.27-.406.171-.043.27.026.27.271v.143l.51-.127v-.108c0-.411-.151-.653-.448-.693zm-1.461.343-.54.135v3.43l.54-.135v-3.43zm-1.332.387c-.1-.012-.219 0-.354.033l-.853.21v3.43l.853-.21c.54-.134.803-.499.803-1.047v-1.735c0-.411-.147-.647-.45-.681zm-.248.514c.101.01.158.094.158.277v1.783c0 .245-.102.358-.273.4l-.305.076v-2.45l.305-.075a.346.346 0 0 1 .115-.012z" font-family="Bebas Neue" font-weight="700" letter-spacing="0" word-spacing="0" ></path></svg>Bank Offer</b><br></br>Enjoy a 5% discount when you pay with select banks. Save more on your next purchase!</button>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(10)}><b><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="offer"><path fill="#df1e49" d="m26.7 22.703-8.236 7.15v-5.6l8.236-7.15zM15.17 17.168 29.994 4.452v7.84L15.17 25.008z"></path><path fill="#ff1e55" d="m15.17 25.015 11.529-2.31v-7.84l-11.53 2.31zM2 7.267l28-5.12v10.08l-28 5.12z"></path><path fill="#fff" d="M23.086 5.12a2.794 2.794 0 0 0-.367.048l-1.54.297v6.486l1.02-.197v-2.64l.354-.07c.463-.09.666.094.666.696v1.02c0 .528.038.623.093.78l1.038-.202c-.102-.221-.112-.45-.112-.766v-1c0-.676-.166-1.135-.675-1.25.454-.3.666-.778.666-1.445v-.51c0-.875-.349-1.294-1.143-1.248zm-2.527.466-2.782.537v6.486l2.782-.537v-.927l-1.762.341v-1.9l1.4-.272V8.39l-1.4.271V6.852l1.762-.34v-.926zm2.365.508c.197.04.285.225.285.572v.64c0 .52-.231.73-.611.803l-.399.079V6.194l.492-.095a.592.592 0 0 1 .233-.006zm-5.635.123-2.695.521v6.487l1.017-.198V10.35l1.317-.254V9.17l-1.317.254V7.469l1.678-.324v-.928zm-3.185.617-2.696.521v6.487l1.02-.197v-2.678l1.314-.256v-.926l-1.314.254V8.084l1.676-.324v-.926zm-4.551.834a2.22 2.22 0 0 0-.356.041c-1 .193-1.547.892-1.547 1.93v3.373c0 1.038.547 1.523 1.547 1.33 1.001-.194 1.55-.892 1.55-1.93V9.04c0-.908-.42-1.393-1.194-1.371zm-.135.959c.194.034.309.197.309.545v3.502c0 .463-.205.68-.53.742-.324.063-.527-.074-.527-.537V9.377c0-.463.203-.68.527-.742a.62.62 0 0 1 .221-.008z" font-family="Bebas Neue" font-size="9.266" font-weight="700" letter-spacing="0" word-spacing="0" ></path></svg>Seasonal Offer</b><br></br>As a token of our appreciation, here's a 10% discount for our loyal customers. Thank you for your continued support!</button>
              <button type="button" className="discount-btn" onClick={() => applyDiscount(20)}> <b><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" id="offer"><path fill="#df1e49" d="m26.7 22.703-8.236 7.15v-5.6l8.236-7.15zM15.17 17.168 29.994 4.452v7.84L15.17 25.008z"></path><path fill="#ff1e55" d="m15.17 25.015 11.529-2.31v-7.84l-11.53 2.31zM2 7.267l28-5.12v10.08l-28 5.12z"></path><path fill="#fff" d="M23.086 5.12a2.794 2.794 0 0 0-.367.048l-1.54.297v6.486l1.02-.197v-2.64l.354-.07c.463-.09.666.094.666.696v1.02c0 .528.038.623.093.78l1.038-.202c-.102-.221-.112-.45-.112-.766v-1c0-.676-.166-1.135-.675-1.25.454-.3.666-.778.666-1.445v-.51c0-.875-.349-1.294-1.143-1.248zm-2.527.466-2.782.537v6.486l2.782-.537v-.927l-1.762.341v-1.9l1.4-.272V8.39l-1.4.271V6.852l1.762-.34v-.926zm2.365.508c.197.04.285.225.285.572v.64c0 .52-.231.73-.611.803l-.399.079V6.194l.492-.095a.592.592 0 0 1 .233-.006zm-5.635.123-2.695.521v6.487l1.017-.198V10.35l1.317-.254V9.17l-1.317.254V7.469l1.678-.324v-.928zm-3.185.617-2.696.521v6.487l1.02-.197v-2.678l1.314-.256v-.926l-1.314.254V8.084l1.676-.324v-.926zm-4.551.834a2.22 2.22 0 0 0-.356.041c-1 .193-1.547.892-1.547 1.93v3.373c0 1.038.547 1.523 1.547 1.33 1.001-.194 1.55-.892 1.55-1.93V9.04c0-.908-.42-1.393-1.194-1.371zm-.135.959c.194.034.309.197.309.545v3.502c0 .463-.205.68-.53.742-.324.063-.527-.074-.527-.537V9.377c0-.463.203-.68.527-.742a.62.62 0 0 1 .221-.008z" font-family="Bebas Neue" font-size="9.266" font-weight="700" letter-spacing="0" word-spacing="0" ></path></svg> First Order Discount</b> <br></br>Welcome to our store! Get a 20%% discount on your first order. Enjoy your shopping experience with us!</button>
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
