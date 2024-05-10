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

  return (
    <div className="fixed top-0 left-0 z-[1000] w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh] mx-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
