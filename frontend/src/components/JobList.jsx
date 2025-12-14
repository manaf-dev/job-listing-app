import React, { useState, useEffect } from "react";
import { api } from "../api/client";
import JobCard from "./JobCard";
import LoadingSpinner from "./LoadingSpinner";

function JobList({ search = "", location = "", onLocationChange }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [search, location]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const params = {};
      if (search) params.search = search;
      if (location) params.location = location;

      const response = await api.get("/jobs", { params });
      setJobs(response.data);

      if (response.status === 404) {
        setError("No jobs found.");
      } else if (response.status === 400) {
        setError("Invalid search query.");
      }

      const uniqueLocations = [
        ...new Set(response.data.map((job) => job.location)),
      ];

      onLocationChange(uniqueLocations);
      setError(null);
    } catch (err) {
      setError("Failed to load jobs.");
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
