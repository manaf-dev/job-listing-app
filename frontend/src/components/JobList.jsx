import React, { useState, useEffect } from "react";
import { api } from "../api/client";
import JobCard from "./JobCard";
import LoadingSpinner from "./LoadingSpinner";

function JobList({ query = "" }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [query]); // ✅ re-run when query changes

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const params = {};
      if (query.trim() !== "") {
        params.search = query;
      }

      const response = await api.get("/jobs", { params });
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load jobs. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-xl">No jobs match your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
