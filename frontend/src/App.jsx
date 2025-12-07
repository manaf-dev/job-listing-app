import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CreateJobPage from "./pages/CreateJobPage";
import JobSuccessPage from "./pages/JobSuccessPage";

function App() {
  const [newJob, setNewJob] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create-job"
          element={<CreateJobPage onJobCreated={setNewJob} />}
        />
        <Route path="/success" element={<JobSuccessPage job={newJob} />} />
      </Routes>
    </Router>
  );
}

export default App;
