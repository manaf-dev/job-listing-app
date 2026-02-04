import React from "react";
import EmployerAuthForm from "../components/EmployerAuthForm";

function EmployerAuthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <EmployerAuthForm />
      </div>
    </div>
  );
}

export default EmployerAuthPage;
