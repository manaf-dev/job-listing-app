import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, authHeader } from "../api/client";

function CreateJobForm({ onJobCreated }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/jobs/", formData, {
        headers: authHeader(),
      });
      onJobCreated(response.data);
      navigate("/success");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to create job. Please try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Job Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          placeholder="e.g., Senior React Developer"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="company"
          className="block text-gray-700 font-semibold mb-2"
        >
          Company Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          placeholder="e.g., Tech Company Inc."
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="location"
          className="block text-gray-700 font-semibold mb-2"
        >
          Work Location *
        </label>
        <select
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
        >
          <option value="">Select work location</option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Job Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="8"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
          placeholder="Describe the job responsibilities, requirements, and benefits..."
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateJobForm;
