import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const LearnModulePage = () => {
  const location = useLocation();
  const { module } = location.state;

  console.log(module);

  const [openSection, setOpenSection] = useState("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const isSectionOpen = (section) => {
    return openSection === section;
  };

  const markComplete = (sectionTitle) => {
    // Implement logic to mark section as completed
    alert(`Section "${sectionTitle}" marked as completed!`);
  };

  const openQuizModal = () => {
    setQuizModalOpen(true);
    setCurrentQuestion(0); // Reset current question index when opening the modal
  };

  const closeQuizModal = () => {
    setQuizModalOpen(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < module.quizzes[0].quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinishQuiz = () => {
    // Implement logic to handle finishing the quiz
    alert("Quiz completed!");
    closeQuizModal();
  };

  return (
    <div className="min-h-screen lg:px-32 lg:py-12 px-12 py-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
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
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => markComplete("Videos")}
            >
              Complete
            </button>
          </div>
          {isSectionOpen("videos") && (
            <div className="p-4 bg-gray-100">
              {module.videos.map((video, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">{video.title}</h3>
                  <p className="text-gray-600 mt-4">{video.description}</p>
                  <p className="text-sm text-gray-500 mt-4">
                    Duration: {video.duration}
                  </p>
                  <div className="mt-10">
                    <video controls className="w-full" key={video.title}>
                      <source src={video.link} type="video/mp4" />
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
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => markComplete("Readings")}
            >
              Complete
            </button>
          </div>
          {isSectionOpen("readings") && (
            <div className="p-4 bg-gray-100">
              {module.readings.map((reading, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">{reading.title}</h3>
                  <p className="text-gray-600 mt-4">{reading.description}</p>
                  <p className="text-sm mt-4 text-gray-500">
                    Duration: {reading.duration}
                  </p>
                </div>
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
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => markComplete("Quizzes")}
            >
              Complete
            </button>
          </div>
          {isSectionOpen("quizzes") && (
            <div className="p-4 bg-gray-100">
              {module.quizzes.map((quiz, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium mb-1">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                  <p className="text-sm text-gray-500">
                    Duration: {quiz.duration}
                  </p>
                  <div className="flex items-center mt-5">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={openQuizModal}
                    >
                      Take Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[1000]">
          <div className="bg-white p-4 rounded-lg mx-10">
            <h2 className="text-xl font-semibold mb-4">OOP Quiz</h2>
            <p className="text-gray-600">{module.quizzes[0].description}</p>
            <p className="text-sm text-gray-500">
              Duration: {module.quizzes[0].duration}
            </p>
            <div className="mt-4">
              {/* Show one question at a time based on currentQuestion index */}
              <div className="mb-2">
                <p className="font-semibold mb-5">
                  {module.quizzes[0].quiz.questions[currentQuestion].question}
                </p>
                <div className="ml-4">
                  {module.quizzes[0].quiz.questions[
                    currentQuestion
                  ].options.map((option, idx) => (
                    <label key={idx} className="block mb-1">
                      <input
                        type="radio"
                        name={`question${currentQuestion}`}
                        value={option}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              {currentQuestion < module.quizzes[0].quiz.questions.length - 1 ? (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={handleFinishQuiz}
                >
                  Finish
                </button>
              )}
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
