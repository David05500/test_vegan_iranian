import React from "react"
import reducer from './reducer'
import { Provider } from './context'
import { CardElement, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`) 

const StripeProvider = ({ children }) => {
    const [
        {
            paymentDetails,
            amount,
            isProcessing,
            checkoutError,
            isPaymentSuccess
        },
        dispatch
    ] = React.useReducer(reducer, {
        paymentDetails: {
            name: "",
            email: "",
            address: {
              city: "",
              line1: "",
              county: "",
              postCode: ""
            }
        },
        amount: 0,
        isProcessing: false,
        checkoutError: "",
        isPaymentSuccess: false
    })

    const setProcessing = val => dispatch({ type: "UPDATE_VALUE", key: "isProcessing", value: val })
    const setCheckoutError = val => dispatch({ type: "UPDATE_VALUE", key: "checkoutError", value: val })
    const handleCardDetailsChange = ev => setCheckoutError(ev.error ? ev.error.message : "")

    const onSuccessfulCheckout = () => console.log("Success");

    const handleFormSubmit = async (stripe, elements) => {
        if (!stripe || !elements) return
    
        setProcessing(true)
    
        try {
          const { data: clientSecret } = await axios.post("/api/payment_intents", {
            amount: amount * 100,
            description: "Donation"
          });
    
          const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: paymentDetails.name,
                email: paymentDetails.email,
                address: {
                //   city: paymentDetails.address.city,
                //   line1: paymentDetails.address.line1,
                //   state: paymentDetails.address.county,
                  postal_code: paymentDetails.address.postCode
                }
              }
          });

          if (paymentMethodReq.error) {
            setCheckoutError(paymentMethodReq.error.message);
            setProcessing(false);
            return;
          }
    
          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethodReq.paymentMethod.id
          });
    
          if (error) {
            setCheckoutError(error.message);
            setProcessing(false);
            return;
          }
    
          onSuccessfulCheckout();
          setProcessing(false);
          dispatch({ type: "UPDATE_VALUE", key: "isPaymentSuccess", value: true })
          
        } catch (err) {
          setCheckoutError(err.message);
        }
    };


    return (
        <Provider
            value={{
                paymentDetails,
                amount,
                isProcessing,
                checkoutError,
                isPaymentSuccess,
                setPaymentDetails: val => dispatch({ type: "UPDATE_VALUE", key: "paymentDetails", value: val }),
                setAmount: val => dispatch({ type: "UPDATE_VALUE", key: "amount", value: val }),
                handleFormSubmit: handleFormSubmit,
                updateValue: (key, val) => dispatch({ type: "UPDATE_VALUE", key: key, value: val }),
                handleCardDetailsChange: handleCardDetailsChange
            }}
        >
            <Elements stripe={stripePromise}>
                {children}
            </Elements>
        </Provider>
    )
}

export default StripeProvider