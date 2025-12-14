import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import LoadingSpinner from "../components/LoadingSpinner";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
      setError(null);
    } catch (err) {
      setError("Job not found.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="text-blue-600 underline">
        ← Back to jobs
      </Link>

      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

        <p className="text-gray-600 mt-2">
          {job.company} • {job.location}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Posted on {new Date(job.posted_date).toLocaleDateString()}
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
