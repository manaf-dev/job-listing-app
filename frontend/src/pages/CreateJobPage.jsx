import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateJobForm from "../components/CreateJobForm";
import { getAuthToken } from "../api/client";

function CreateJobPage({ onJobCreated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/employer/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CreateJobForm onJobCreated={onJobCreated} />
      </div>
    </div>
  );
}

export default CreateJobPage;
