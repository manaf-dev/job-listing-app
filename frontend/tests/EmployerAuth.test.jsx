import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EmployerAuthPage from "../src/pages/EmployerAuthPage";
import { api, setAuthToken } from "../src/api/client";

afterEach(() => {
  setAuthToken(null);
});

test("employer login form submits credentials", async () => {
  vi.spyOn(api, "post").mockResolvedValue({
    data: { token: "token-123", employer: { id: 1, email: "test@co.com" } },
  });
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <EmployerAuthPage />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/work email/i), "test@co.com");
  await user.type(screen.getByLabelText(/password/i), "password123");
  const signInButtons = screen.getAllByRole("button", { name: /sign in/i });
  await user.click(signInButtons[1]);

  expect(api.post).toHaveBeenCalledWith("/employers/login", {
    email: "test@co.com",
    password: "password123",
  });
});
