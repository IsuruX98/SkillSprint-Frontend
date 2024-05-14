import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const PaymentManagement = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("payment-details/all");
        setPaymentDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details:", error);
        setLoading(false);
        // Handle error
      }
    };

    fetchPaymentDetails();
  }, []);

  return (
    <div className="py-8">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full shadow-md rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Payment ID</th>
                <th className="p-3">Course Name</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Stripe ID</th>
                <th className="p-3">Is Paid</th>
                <th className="p-3">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.map((payment) => (
                <tr
                  key={payment.paymentID}
                  className="border-t hover:bg-gray-100 text-center"
                >
                  <td className="p-3">{payment.paymentID}</td>
                  <td className="p-3">{payment.courseName}</td>
                  <td className="p-3">{payment.studentName}</td>
                  <td className="p-3">$ {payment.amount}</td>
                  <td className="p-3">{payment.stripeID}</td>
                  <td className="p-3">
                    <span
                      className={
                        payment.isPaid
                          ? "inline-block px-2 py-1 rounded bg-green-500 text-white font-bold"
                          : "text-red-600"
                      }
                    >
                      {payment.isPaid ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(payment.paidDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
