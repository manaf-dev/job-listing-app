import React from "react";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-blue-600 font-semibold mb-3">{job.company}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  );
}

export default JobCard;
