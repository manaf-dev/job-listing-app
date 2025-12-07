import React from "react";
import { useNavigate } from "react-router-dom";

function JobSuccessPage({ job }) {
  const navigate = useNavigate();

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No job data available</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Job Posted Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your job listing is now live and visible to candidates.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Job Details
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Job Title</p>
              <p className="text-gray-800 font-semibold">{job.title}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Company</p>
              <p className="text-gray-800 font-semibold">{job.company}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Description</p>
              <p className="text-gray-700">{job.description}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/create-job")}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Post Another Job
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSuccessPage;
