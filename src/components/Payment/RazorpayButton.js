import React,{ useEffect, useState } from "react";
import { paymentOrderCreationApi } from "../../api/paymentApi";
const apiKey = process.env.REACT_APP_PAYMENT_API_KEY;

const RazorpayButton = () => {

  const loadScript = (src, id) => {
    return new Promise((resolve) => {
      // Check if the script with this id is already loaded
      if (document.getElementById(id)) {
        console.log('Razorpay script already loaded');
        resolve(true);
        return;
      }
  
      // Create and load the script with a specific id
      const script = document.createElement('script');
      script.src = src;
      script.id = id; // Assign an id to the script element
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay_script');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {

      const orderCreationPayload = {
        "amount": "100",
        "currency": "USD",
        "planId": "abc",
        "userId": "123"
      };
  
      const orderCreationResponse = await paymentOrderCreationApi(orderCreationPayload);
      console.log(`orderCreationResponse:: ${JSON.stringify(orderCreationResponse)}`);
  
      const options = {
        key: apiKey,
        amount: '50000', //amount in paise, 100
        currency: 'INR',
        name: 'SortMyResumes',
        description: 'Test Transaction',
        order_id: orderCreationResponse.id,
        handler: function (response) {
          console.log(`Payment Response:  ${JSON.stringify(response)}`);
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
        console.log(`payment error ${JSON.stringify(error)}`);
    }
  };

  return (
    <button onClick={displayRazorpay}>
      Pay Now
    </button>
  );
};

export default RazorpayButton;
