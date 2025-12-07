import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateJobPage from "../src/pages/CreateJobPage";
import { api } from "../src/api/client";

test("submit button behavior", async () => {
  vi.spyOn(api, "post").mockResolvedValue({ data: { id: 1, title: "Dev" } });
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <CreateJobPage onJobCreated={() => {}} />
    </MemoryRouter>
  );

  const btn = screen.getByRole("button", { name: /post job/i });

  // Now this works with jest-dom
  expect(btn).toBeEnabled();

  await user.type(screen.getByLabelText(/job title/i), "Dev");
  await user.type(screen.getByLabelText(/company name/i), "Acme");
  await user.selectOptions(screen.getByLabelText(/work location/i), "remote");
  await user.type(
    screen.getByLabelText(/job description/i),
    "A long enough description"
  );

  expect(btn).toBeEnabled();
});
