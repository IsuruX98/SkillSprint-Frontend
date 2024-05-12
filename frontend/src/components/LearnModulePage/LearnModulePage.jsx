import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../notifications/notifications";
import axios from "../../api/axios";

const ReadingComponent = ({ reading }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">{reading.title}</h3>
        <p className=" text-gray-500">Duration: {reading.duration} mins</p>
      </div>

      <div className="flex justify-center mb-8">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: reading.description }}
        ></div>
      </div>
    </div>
  );
};

const LearnModulePage = () => {
  const location = useLocation();
  const { module, index } = location.state;

  console.log("index", index);

  const { user } = useAuth();

  const userId = user && user.userId;
  const quizId = module && module.quizDTO.id;

  console.log("user module", module);

  const [openSection, setOpenSection] = useState("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const isSectionOpen = (section) => {
    return openSection === section;
  };

  const markComplete = (sectionTitle) => {
    alert(`Section "${sectionTitle}" marked as completed!`);
  };

  const openQuizModal = () => {
    setQuizModalOpen(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const closeQuizModal = () => {
    setQuizModalOpen(false);
  };

  const handleAnswer = (optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleFinishQuiz = async () => {
    try {
      // Increment each answer value by 1
      const incrementedAnswers = answers.map((answer) => answer + 1);

      // Make the POST request to submit quiz answers using Axios
      const response = await axios.post("score/", {
        userId: userId,
        quizId: quizId,
        answers: incrementedAnswers,
      });

      // Extract score from response data
      const score = response.data.score;

      // Display the score in an alert
      SuccessNotification(`Your score: ${score}`);

      // Close the quiz modal
      closeQuizModal();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      // Handle error as needed
    }
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.round(durationInSeconds % 60);
    return `${minutes} min ${seconds} sec`;
  };

  const isLastQuestion =
    currentQuestionIndex === module.quizDTO.questions.length - 1;

  return (
    <div className="min-h-screen lg:px-32 lg:py-12 px-12 py-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">{module.moduleName}</h1>
        <p className="text-lg mb-10 mt-5 bg-gray-100 rounded-xl p-5">
          Welcome to the learning module! This module is designed to help you
          grasp the concepts effectively. Below are the instructions to maximize
          your learning experience:
          <br />
          <br />
          <span className="font-semibold">1. Sections:</span> Each module is
          divided into sections like Videos, Readings, and Quizzes. Click on the
          section title to expand and view its contents.
          <br />
          <br />
          <span className="font-semibold">2. Completing Sections:</span> After
          going through a section, click on the "Complete" button to mark it as
          completed. This helps you keep track of your progress.
          <br />
          <br />
          <span className="font-semibold">3. Quizzes:</span> In the Quizzes
          section, click on the "Take Quiz" button to start a quiz related to
          the module. Answer each question thoughtfully, and upon completion,
          click "Finish" to see your results.
          <br />
          <br />
          Enjoy your learning journey!
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-20">
        {/* Videos Section */}
        <div className="border-b">
          <div
            className="p-4 flex justify-between items-center cursor-pointer "
            onClick={() => toggleSection("videos")}
          >
            <h2 className="text-xl font-semibold">Videos</h2>
          </div>
          {isSectionOpen("videos") && (
            <div className="p-4 bg-gray-100">
              {module.videoDTOList.map((video, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-4">
                    Duration: {formatDuration(video.duration)}
                  </p>
                  <div className="mt-10">
                    <video controls className="w-full" key={video.title}>
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Readings Section */}
        <div className="border-b">
          <div
            className="p-4 flex justify-between items-center cursor-pointer "
            onClick={() => toggleSection("readings")}
          >
            <h2 className="text-xl font-semibold">Readings</h2>
          </div>
          {isSectionOpen("readings") && (
            <div className="p-4 bg-gray-100">
              {module.readingDTOList.map((reading, index) => (
                <ReadingComponent key={index} reading={reading} />
              ))}
            </div>
          )}
        </div>
        {/* Quizzes Section */}
        <div className="border-b">
          <div
            className="p-4 flex justify-between items-center cursor-pointer "
            onClick={() => toggleSection("quizzes")}
          >
            <h2 className="text-xl font-semibold">Quizzes</h2>
          </div>
          {isSectionOpen("quizzes") && (
            <div className="p-4 bg-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-1">
                  {module.quizDTO.title}
                </h3>
                <p className="text-gray-600">{module.quizDTO.description}</p>
                <p className="text-sm text-gray-500 mt-5">Duration: 30 mins</p>
                <div className="flex items-center mt-6">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={openQuizModal}
                  >
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[1000]">
          <div className="bg-white p-4 rounded-lg mx-10">
            <h2 className="text-xl font-semibold mb-4">
              {module.quizDTO.questions[currentQuestionIndex].question}
            </h2>
            <div className="mt-4">
              {module.quizDTO.questions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <div key={optionIndex} className="mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="answer"
                        value={optionIndex}
                        checked={answers[currentQuestionIndex] === optionIndex}
                        onChange={() => handleAnswer(optionIndex)}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              {isLastQuestion ? (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleFinishQuiz}
                >
                  Finish
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex === module.quizDTO.questions.length - 1
                  }
                >
                  Next
                </button>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={closeQuizModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnModulePage;
