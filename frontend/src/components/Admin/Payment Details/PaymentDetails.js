import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import AdminNav from '../../Navbar/AdminNav';

function PaymentDetails() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('https://food-ordering-app-wlwn.onrender.com/paymentDetails')
      .then((res) => {
        setPayments(res.data.payments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <div>  <AdminNav/></div>
     <div><Sidebar/></div>
        <h1>Payment Details</h1>
        
        <div className='background' style={{height:'100vh'}} >
           
      <div></div>
      <table className="table" style={{ marginBottom: '9rem',borderRadius:'none',marginTop:'3rem',marginLeft:'3rem'}}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment,index) => (
            <tr key={index}>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p style={{fontSize:"15px"}} >{payment.name}</p></td>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p style={{fontSize:"15px"}} >{payment.address}</p></td>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p style={{fontSize:"15px"}} >{payment.place}</p></td>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p style={{fontSize:"15px"}} >{payment.total}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
}

export default PaymentDetails;
