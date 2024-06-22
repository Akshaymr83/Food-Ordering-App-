import React from 'react'



function orderPay() {
    const amount = 500;
    const currency = "INR";
    const receiptId = "qwsaq1";
    const paymentHandler = async(e)=>{
       const response = await fetch("http://localhost:4000/orderPay",{
        method: "POST",
        body: JSON.stringify({
            amount,currency,receiptId,
        }),
        headers:{
            "Content-Type" : "application/json",
        },
       });
       const order = await response.json();
       console.log(order);
    }
  return (
    <div>
        <div>
        <h2>tshirt</h2>
        <button onClick={paymentHandler}>pay</button>
        </div></div>
  )
}

export default orderPay ;