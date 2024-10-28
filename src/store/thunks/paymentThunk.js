import { paymentCompletionApi, paymentOrderCreationApi } from "../../api/paymentApi";
import { loadScript } from "../../utils/uiUtils";
import { setPaymentAmount, setPaymentPlanId, setPaymentTriggered, uiReset } from "../uiSlice";
import { setUserPlan } from "../userSlice";

const apiKey = process.env.REACT_APP_PAYMENT_API_KEY;

export const updatePaymentThunk = () => async (dispatch, getState) => {
    const { user, ui } = getState();
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay_script');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    let amount = ui.paymentAmount;
    let planId = ui.paymentPlanId;

    try {

      const convertedAmount = `${amount*100}`;

      const orderCreationPayload = {
        "amount": amount,
        "currency": "USD",
        "planId": planId,
        "userId": user?.userId,
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
              "userId": user?.userId, // todo: should be real user id
              "paymentStatus": "SUCCESS"
          }
          const paymentResponse = await paymentCompletionApi(paymentPayload);
          dispatch(setUserPlan(planId));
          console.log(`paymentResponse:: ${paymentResponse}`);
          dispatch(uiReset());
        },
        prefill: {
          name: user?.userEmail,
          email: user?.userEmail,
        //   contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
        console.log(`payment error ${JSON.stringify(error)}`);
        dispatch(setPaymentTriggered(false));
    }
}