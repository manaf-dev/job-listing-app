import React from "react";
import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
      <p className="text-blue-600 font-semibold mb-3">{job.company}</p>
      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
      <Link
        to={`/jobs/${job.id}`}
        className="w-full p-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default JobCard;
