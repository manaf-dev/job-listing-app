import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import JobList from "../src/components/JobList";
import { api } from "../src/api/client";
import { MemoryRouter } from "react-router-dom";

// Mock API before importing component
vi.mock("../src/api/client", () => ({
  api: { get: vi.fn() },
}));

describe("JobList", () => {
  it("renders jobs", async () => {
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Frontend Dev", company: "Tech", location: "Accra" },
      ],
    });

    render(
      <MemoryRouter>
        <JobList search="" location="" onLocationChange={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Frontend Dev")).toBeInTheDocument();
      expect(screen.getByText(/Tech/i)).toBeInTheDocument();
    });
  });
});
