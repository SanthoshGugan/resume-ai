import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userAuthenticationSelector, userPlanSelector } from "../../store/selectors/userSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { setPaymentAmount, setPaymentTriggered, setPaymentPlanId, setPreviousPage } from "../../store/uiSlice";
import { paymentOrderCreationApi, paymentCompletionApi } from "../../api/paymentApi";
import { setUserPlan } from "../../store/userSlice";
import { isPaymentTriggered } from "../../store/selectors/uiSelector";
import { updatePaymentThunk } from "../../store/thunks/paymentThunk";
import { URLs } from "../../utils/urls";
const apiKey = process.env.REACT_APP_PAYMENT_API_KEY;

const RazorpayButton = ({ amount, planId }) => {
  const isUserAuthenticated = useSelector(state => userAuthenticationSelector(state));
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPlan = useSelector(state => userPlanSelector(state));
  const location = useLocation();
  const paymentTriggered = useSelector(state => isPaymentTriggered(state));

  // const loadScript = (src, id) => {
  //   return new Promise((resolve) => {
  //     if (document.getElementById(id)) {
  //       console.log('Razorpay script already loaded');
  //       resolve(true);
  //       return;
  //     }

  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.id = id;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };

  const displayRazorpay = async () => {
    console.log(`isUserAuthenticated ${isUserAuthenticated} userPlan:: ${userPlan}`);
    if (!isUserAuthenticated) {
      setShowLogin(true);
      return;
    }
    dispatch(setPaymentAmount(amount));
    dispatch(setPaymentPlanId(planId));
    dispatch(updatePaymentThunk());

    // const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay_script');
    // if (!res) {
    //   alert('Razorpay SDK failed to load. Are you online?');
    //   return;
    // }

    // try {

    //   const convertedAmount = `${amount*100}`;

    //   const orderCreationPayload = {
    //     "amount": amount,
    //     "currency": "USD",
    //     "planId": planId,
    //     "userId": "123",
    //     "units": "cents",
    //     "amount_in_units": convertedAmount
    //   };
  
    //   const orderCreationResponse = await paymentOrderCreationApi(orderCreationPayload);
    //   console.log(`orderCreationResponse:: ${JSON.stringify(orderCreationResponse)}`);
  
    //   const options = {
    //     key: apiKey,
    //     amount: convertedAmount, //amount in cents
    //     currency: 'USD',
    //     name: 'SortMyResumes',
    //     description: 'Test Transaction',
    //     order_id: orderCreationResponse.data?.id,
    //     handler: async function (response) {
    //       console.log(`Payment Response:  ${JSON.stringify(response)}`);
    //       const paymentPayload = {
    //           "orderId": orderCreationResponse.data?.id,
    //           "paymentId": response.razorpay_payment_id,
    //           "userId": "123", // todo: should be real user id
    //           "paymentStatus": "SUCCESS"
    //       }
    //       const paymentResponse = await paymentCompletionApi(paymentPayload);
    //       dispatch(setUserPlan(planId));
    //       console.log(`paymentResponse:: ${paymentResponse}`);
    //     },
    //     prefill: {
    //       name: 'Your Name',
    //       email: 'your-email@example.com',
    //       contact: '9999999999',
    //     },
    //     theme: {
    //       color: '#F37254',
    //     },
    //   };
  
    //   const paymentObject = new window.Razorpay(options);
    //   paymentObject.open();
    // } catch (error) {
    //     console.log(`payment error ${JSON.stringify(error)}`);
    // }
  };

  const handleLogin = () => {
    // Call your internal login flow function here
    // console.log('Invoke your internal login flow');
    setShowLogin(false);  // Close the modal after login is triggered
    // dispatch(setPreviousPage(location.pathname));
    dispatch(setPaymentAmount(amount));
    dispatch(setPaymentPlanId(planId))
    navigate(URLs.LOGIN, { state: { from: location } });
  };

  const handleLoginClose = () => setShowLogin(false);

  return (
    <>
      { userPlan == planId ? (
          <Button variant="secondary" size="lg">Your Current Plan</Button>
      ) : (
        <Button variant="primary" size="lg" onClick={displayRazorpay}>Choose Plan</Button>
      )}

      {/* Conditional Login Modal */}
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please log in to continue with your purchase.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RazorpayButton;
