import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useAuth } from "../../../../../context/authContext";
import axios from "../../../../../api/axios";
import LoadingSpinner from "../../../../../components/LoadingSpinner/LoadingSpinner";
import {
  SuccessNotification,
  ErrorNotification,
} from "../../../../../notifications/notifications";

const AddQuizDetails = () => {
  const { user } = useAuth();
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [moduleOptions, setModuleOptions] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `course-controller/instructor/${user.userId}`
        );
        setCourseOptions(
          response.data.map((course) => ({
            id: course.id,
            name: course.courseName,
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get(
            `module-controller/${selectedCourse}`
          );

          if (Array.isArray(response.data)) {
            setModuleOptions(
              response.data.map((module) => ({
                id: module.id,
                name: module.moduleName,
              }))
            );
          } else {
            setModuleOptions([]);
          }
        } else {
          setModuleOptions([]);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, [selectedCourse]);

  console.log("selectedModule", selectedModule);

  // State variables for form inputs
  const [module, setModule] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", ""], correctAnswer: "" },
  ]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while sending the request

    try {
      const quizData = {
        moduleId: selectedModule, // Assuming selectedModule is the ID of the selected module
        title: quizTitle,
        description: quizDescription,
        questions: questions.map((question) => ({
          question: question.question,
          options: question.options,
        })),
        correctAnswers: questions.map((question) => question.correctAnswer),
      };

      // Send the request to the API
      const response = await axios.post("quiz/add", quizData);

      // Handle success notification
      SuccessNotification("Quiz added successfully");

      // Reset form fields
      setModule("");
      setQuizTitle("");
      setQuizDescription("");
      setQuestions([{ question: "", options: ["", ""], correctAnswer: "" }]);
    } catch (error) {
      console.error("Error adding quiz:", error);
      // Handle error notification
      ErrorNotification("Failed to add quiz. Please try again later.");
    } finally {
      setLoading(false); // Set loading state back to false after request completes
    }
  };

  // Function to add a new question to the quiz
  const addQuestion = () => {
    const newQuestion = { question: "", options: ["", ""], correctAnswer: "" };
    setQuestions([...questions, newQuestion]);
  };

  // Function to remove a question from the quiz
  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  // Function to add a new option to a question
  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  // Function to remove an option from a question
  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  // Function to handle changes in question text
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // Function to handle changes in option text
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Function to handle changes in correct answer
  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Add Quiz Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a course</option>
            {courseOptions.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="module"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a Module
          </label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">Select a module</option>
            {moduleOptions.length === 0 ? (
              <option disabled>No modules available for selected course</option>
            ) : (
              moduleOptions.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="quizTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quiz Title
          </label>
          <input
            type="text"
            id="quizTitle"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label
            htmlFor="quizDescription"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quiz Description
          </label>
          <textarea
            id="quizDescription"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            rows="3"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          ></textarea>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Questions</h3>
          {questions.map((question, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md mb-4 relative"
            >
              <div className="flex justify-between items-center mb-4">
                <label
                  htmlFor={`question-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Question {index + 1}
                </label>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="px-2 py-1 flex items-center bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    <MdDelete /> Remove Question
                  </button>
                )}
              </div>

              <input
                type="text"
                id={`question-${index}`}
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800 mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-3">
                    <input
                      type="text"
                      id={`option-${index}-${optionIndex}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                    {optionIndex !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index, optionIndex)}
                        className="py-3 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addOption(index)}
                className="flex items-center gap-2 mt-5 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MdAdd /> Add Option
              </button>
              <label
                htmlFor={`correct-answer-${index}`}
                className="block text-sm font-medium text-gray-700 mb-2 mt-4"
              >
                Correct Answer
              </label>
              <input
                type="text"
                id={`correct-answer-${index}`}
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(index, e.target.value)
                }
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="py-2 px-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <MdAdd /> Add Question
          </button>
        </div>
        <div>
          <button
            type="submit"
            className="py-3 mt-8 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Quiz
          </button>
          {loading && <LoadingSpinner />}
        </div>
      </form>
    </div>
  );
};

export default AddQuizDetails;
