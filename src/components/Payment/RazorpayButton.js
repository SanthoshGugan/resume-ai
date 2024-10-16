import React,{ useEffect, useState } from "react";
import { paymentOrderCreationApi, paymentCompletionApi } from "../../api/paymentApi";
import { Button } from "react-bootstrap";
const apiKey = process.env.REACT_APP_PAYMENT_API_KEY;

const RazorpayButton = ({ amount, planId }) => {

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

      const convertedAmount = `${amount*100}`;

      const orderCreationPayload = {
        "amount": amount,
        "currency": "USD",
        "planId": planId,
        "userId": "123",
        "units": "cents",
        "amount_in_units": convertedAmount
      };
  
      const orderCreationResponse = await paymentOrderCreationApi(orderCreationPayload);
      console.log(`orderCreationResponse:: ${JSON.stringify(orderCreationResponse)}`);
  
      const options = {
        key: apiKey,
        amount: convertedAmount, //amount in cents
        currency: 'USD',
        name: 'SortMyResumes',
        description: 'Test Transaction',
        order_id: orderCreationResponse.data?.id,
        handler: async function (response) {
          console.log(`Payment Response:  ${JSON.stringify(response)}`);
          const paymentPayload = {
              "orderId": orderCreationResponse.data?.id,
              "paymentId": response.razorpay_payment_id,
              "userId": "123", // todo: should be real user id
              "paymentStatus": "SUCCESS"
          }
          const paymentResponse = await paymentCompletionApi(paymentPayload);
          console.log(`paymentResponse:: ${paymentResponse}`);
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
    <Button variant="primary" size="lg" onClick={displayRazorpay}>
      Choose Plan
    </Button>
  );
};

export default RazorpayButton;
