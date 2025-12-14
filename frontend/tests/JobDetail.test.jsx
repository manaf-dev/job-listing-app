import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import JobDetail from "../src/pages/JobDetail";
import { api } from "../src/api/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// 1️⃣ Mock API before importing component
vi.mock("../src/api/client", () => ({
  api: { get: vi.fn() },
}));

describe("JobDetail", () => {
  it("renders job details", async () => {
    // 2️⃣ Mock API response for a single job
    api.get.mockResolvedValueOnce({
      data: {
        id: 1,
        title: "Frontend Dev",
        company: "Tech",
        location: "Accra",
        description: "Build amazing UIs",
      },
    });

    // 3️⃣ Render component with router and initial entry for useParams
    render(
      <MemoryRouter initialEntries={["/jobs/1"]}>
        <Routes>
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // 4️⃣ Wait for API data and assert
    await waitFor(() => {
      expect(screen.getByText("Frontend Dev")).toBeInTheDocument();
      expect(screen.getByText(/Tech/i)).toBeInTheDocument();
      expect(screen.getByText(/Accra/i)).toBeInTheDocument();
      expect(screen.getByText(/Build amazing UIs/i)).toBeInTheDocument();
    });
  });
});
