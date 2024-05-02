import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AiOutlineClose } from "react-icons/ai";

const Payment = ({ onClose, data }) => {
  const stripePromise = loadStripe(
    "pk_test_51PC0YHGIXzTyqz8fqFIO9U9q0jE7SThHxP9CzEyP2NmOZJEQcl0MbHPrljONKhLEGRWhQmSQn7QCYDK5LGLm9dUj00ih1Fxsh7"
  );

  console.log(data);

  const options = {
    mode: "payment",
    amount: data.price,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh] mx-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-black" />
          </button>
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm data={data} />
        </Elements>
      </div>
    </div>
  );
};

const CheckoutForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (elements == null) {
      setLoading(false);
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setLoading(false);
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    try {
      // Simulate creating a PaymentIntent and obtain clientSecret from your server endpoint
      const { data } = await axios.post("/create-intent", {
        amount: data.price,
        currency: "usd",
        payment_method_types: ["card"], // Use "card" for testing with test cards
      });

      const { client_secret: clientSecret } = data;

      // Simulate confirming the PaymentIntent with Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(PaymentElement),
          billing_details: {
            // Include any billing details if required
          },
        },
      });

      if (error) {
        setLoading(false);
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        // Payment successful
        setLoading(false);
        setErrorMessage(null); // Clear any previous error messages
        // You can handle successful payment here, such as redirecting the user or showing a success message
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error occurred while processing payment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && (
        <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
      )}
    </form>
  );
};

export default Payment;
