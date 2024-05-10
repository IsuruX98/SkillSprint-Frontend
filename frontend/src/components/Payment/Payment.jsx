import React, { useState } from "react";
import axios from "../../api/axios";
import { AiOutlineClose } from "react-icons/ai";
import Stripe from "react-stripe-checkout";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/authContext";

const Payment = ({ onClose, data }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  console.log("hi", data);

  async function handleToken(token) {
    try {
      setLoading(true); // Set loading state to true when payment process starts
      const response = await axios.post("payment/charge", "", {
        headers: {
          token: token.id,
          amount: data.price,
          courseName: data.title,
          userName: user.user_Name,
          userEmail: user.email,
          userMobile: user.contactNo,
        },
      });
      if (response.status === 200) {
        alert("Payment Success");
      } else {
        console.log("Payment failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle error here, like showing an error message to the user
    } finally {
      setLoading(false); // Reset loading state whether the payment succeeds or fails
      onClose();
    }
  }

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh] mx-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-black" />
          </button>
        </div>
        <p className="mb-4">This is how you use this component:</p>
        <div className="mb-4">
          <p className="font-semibold">Enter Test Card Details:</p>
          <p className="mb-2">
            Use the following test credit card number to simulate a payment:
          </p>
          <p className="mb-2">
            - <strong>Card Number:</strong> 4242 4242 4242 4242
          </p>
          <p className="mb-2">
            - You can use any future expiration date and any CVC code.
          </p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Initiate Payment:</p>
          <p>Click on the payment button to initiate the payment process.</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Payment Process:</p>
          <ul className="list-disc list-inside">
            <li>The payment form will be submitted to Stripe's servers.</li>
            <li>
              Stripe will handle the payment securely and return a payment token
              upon success.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Payment Confirmation:</p>
          <ul className="list-disc list-inside">
            <li>
              If the payment is successful, an alert will be displayed
              confirming the success.
            </li>
            <li>
              You can also check the payment details in the Stripe dashboard.
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Completion:</p>
          <p>
            After successful payment, the user can proceed with enrolling in the
            course or completing any other related action.
          </p>
        </div>
        {loading && <LoadingSpinner />}
        <Stripe
          stripeKey="pk_test_51PD0LQ01UQdk9J3Z2FYqMDInXEpHDm3sA8wq1M14H11bVYMzc5LeBN9xTwFI5OigtslxMXPbwMNJ1Cz9LKi9xgHq00uO4E916q"
          token={handleToken}
        />
      </div>
    </div>
  );
};

export default Payment;
