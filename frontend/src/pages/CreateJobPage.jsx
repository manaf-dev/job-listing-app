import React from "react";
import CreateJobForm from "../components/CreateJobForm";

function CreateJobPage({ onJobCreated }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CreateJobForm onJobCreated={onJobCreated} />
      </div>
    </div>
  );
}

export default CreateJobPage;
