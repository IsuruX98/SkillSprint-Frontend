import React, { useState } from "react";

const faqData = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, simply click on the 'Enroll Now' button on the course page and follow the instructions to complete the enrollment process.",
  },
  {
    question: "Can I cancel my course enrollment?",
    answer:
      "Yes, you can cancel your course enrollment at any time. Please visit your profile settings and navigate to the 'Enrollments' section to manage your enrolled courses.",
  },
  {
    question: "How do I access course materials?",
    answer:
      "Once enrolled in a course, you can access course materials such as lectures, videos, and quizzes through the course page. Simply click on the respective modules to view the content.",
  },
  {
    question:
      "Are there any discounts available for multiple course enrollments?",
    answer:
      "Yes, we offer discounts for multiple course enrollments. Please contact our support team for more information on available discounts and promotions.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pb-20 pt-32 lg:px-32 px-12 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-blue-500 text-lg font-semibold mb-2 block">
            Frequently Asked Questions
          </span>
          <h2 className="text-dark text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
            Have a Question?
          </h2>
          <p className="text-body-color text-base">
            Find answers to commonly asked questions about our platform and
            services.
          </p>
        </div>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                className="w-full py-4 px-6 text-left flex items-center justify-between focus:outline-none transition duration-300 ease-in-out hover:bg-gray-50"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-primary transform ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="py-4 px-6 bg-gray-50">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
