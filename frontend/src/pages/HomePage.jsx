import React from "react";
import JobList from "../components/JobList";

function HomePage() {
  // search for jobs
  const [jobSearch, setJobSearch] = React.useState("");

  // when user types in search bar, update state
  const handleSearch = (event) => {
    setJobSearch(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Next Job
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing job opportunities from top companies
          </p>

          <div className="mt-6">
            <input
              type="search"
              placeholder="Search for jobs"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus
              focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={jobSearch}
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* pass jobSearch as prop */}
        <JobList query={jobSearch} />
      </div>
    </div>
  );
}

export default HomePage;
