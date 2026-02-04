import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api/client";

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

function EmployerAuthForm() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState(defaultForm);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setFormData(defaultForm);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "register") {
        await api.post("/employers/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setSuccess("Account created. Please sign in to post jobs.");
        setMode("login");
        setFormData({ ...defaultForm, email: formData.email });
      } else {
        const response = await api.post("/employers/login", {
          email: formData.email,
          password: formData.password,
        });
        setAuthToken(response.data.token);
        navigate("/create-job");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Employer Access
      </h2>
      <p className="text-gray-600 mb-6">
        Employers must sign in before posting new job listings.
      </p>

      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => handleModeChange("login")}
          className={`flex-1 py-2 rounded ${
            mode === "login"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("register")}
          className={`flex-1 py-2 rounded ${
            mode === "register"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Create Account
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="mb-4">
            <label
              htmlFor="employer-name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="employer-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              placeholder="e.g., Skyline Tech"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="employer-email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Work Email
          </label>
          <input
            type="email"
            id="employer-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
            placeholder="you@company.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="employer-password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="employer-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
            placeholder="Minimum 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading
            ? "Please wait..."
            : mode === "register"
              ? "Create Account"
              : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default EmployerAuthForm;
