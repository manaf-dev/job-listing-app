import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
