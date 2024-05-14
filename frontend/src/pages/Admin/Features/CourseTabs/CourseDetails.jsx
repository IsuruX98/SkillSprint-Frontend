import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../../../notifications/notifications";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const ModuleComponent = ({ module }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-2">{module.moduleName}</h3>
      {/* Render videos */}
      {module.videoDTOList &&
        module.videoDTOList.map((video, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-base font-semibold">{video.title}</h4>
            <video controls className="w-full" key={video.title}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      {/* Render readings */}
      {module.readingDTOList &&
        module.readingDTOList.map((reading, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg font-semibold my-5">{reading.title}</h4>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: reading.description }}
            ></div>
          </div>
        ))}
      {/* Render quiz */}
      {module.quizDTO && (
        <div className="mb-4">
          <h4 className="text-base font-semibold">{module.quizDTO.title}</h4>
          <p className="text-sm text-gray-600">{module.quizDTO.description}</p>
          <p className="text-sm text-gray-500 mt-5">Duration: 30 mins</p>
          {/* Render questions */}
          <div className="mt-4">
            {module.quizDTO.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <h5 className="text-base font-semibold">{question.question}</h5>
                {/* Render options */}
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`ml-6 ${
                      module.quizDTO.correctAnswers[index] - 1 === optionIndex
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value={optionIndex}
                        checked={question.answer === optionIndex}
                        disabled
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CourseDetails = ({ course }) => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(
    course ? course.status : null
  );

  console.log(courseData);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `course-controller/all-courses/${course.id}`
        );
        const data = await response.data;
        setCourseData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [course, approvalStatus]);

  const handleApprove = async () => {
    try {
      await axios.put(`course-controller/approve/${courseData.id}`);
      SuccessNotification("Course Approved");
      setApprovalStatus("APPROVED");
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.put(`course-controller/decline/${courseData.id}`);
      SuccessNotification("Course Declined");
      setApprovalStatus("DECLINED");
    } catch (error) {
      console.error("Error declining course:", error);
    }
  };

  if (!course) {
    return (
      <div>
        <p className="text-gray-500">Please select a course to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Course Details</h2>
      {loading ? (
        <LoadingSpinner />
      ) : courseData ? (
        <div>
          <div className="mb-6">
            <img
              src={courseData.coverImgUrl}
              alt={courseData.courseName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Title:</p>
            <p className="text-base">{courseData.courseName}</p>
          </div>
          {/* Render modules */}
          {courseData.moduleResponseDTOList ? (
            courseData.moduleResponseDTOList.map((module, index) => (
              <ModuleComponent key={index} module={module} />
            ))
          ) : (
            <p className="text-gray-500 mb-6">No Modules for this course</p>
          )}
          {/* Other course details */}
          <div className="mb-6">
            <p className="text-lg font-semibold">Level:</p>
            <p className="text-base">{courseData.level}</p>
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-base">${courseData.price}</p>
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Description:</p>
            <p className="text-base">{courseData.description}</p>
          </div>
          <div className="mb-6">
            <p className="text-lg font-semibold">Skills Gained:</p>
            <ul className="list-disc list-inside">
              {courseData.skillgained.map((skill, index) => (
                <li key={index} className="text-base">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <span
              className={`inline-block px-2 py-1 rounded ${
                approvalStatus === "PENDING"
                  ? "bg-yellow-500 text-white"
                  : approvalStatus === "APPROVED"
                  ? "bg-green-500 text-white"
                  : approvalStatus === "DECLINED"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              Course is currently {approvalStatus}
            </span>
          </div>
          <div className="mb-6">
            {approvalStatus === "PENDING" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors duration-300"
                onClick={handleApprove}
              >
                Approve
              </button>
            )}
            {approvalStatus === "PENDING" && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                onClick={handleDecline}
              >
                Decline
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Please select a course to view details.</p>
      )}
    </div>
  );
};

export default CourseDetails;
