import React from "react";
import JobList from "../components/JobList";

function HomePage() {
  const [search, setSearch] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [locations, setLocations] = React.useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Next Job
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <input
              type="search"
              placeholder="Search by job or company"
              className="px-4 py-2 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="px-4 py-2 border rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={locations.length === 0}
            >
              <option value="">All locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <JobList
          search={search}
          location={location}
          onLocationChange={setLocations}
        />
      </div>
    </div>
  );
}

export default HomePage;
