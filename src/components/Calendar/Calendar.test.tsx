import React from "react";

import { render } from "@testing-library/react";

import Calendar from "./Calendar";

// jest.mock('react-dom/test-utils', () => ({}))

describe("Calendar", () => {
  test("renders the Calendar Componet", () => {
    render(<Calendar date={new Date()} />);
  });
});
