import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, setAuthToken } from "../api/client";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAuthToken())
  );

  useEffect(() => {
    const handleStorage = () => setIsAuthenticated(Boolean(getAuthToken()));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          JobBoard
        </div>
        <ul className="flex gap-6">
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-200 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/create-job")}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
            >
              Post Job
            </button>
          </li>
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="border border-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/employer/login")}
                className="border border-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                Employer Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
