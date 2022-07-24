import React from "react";

import { render } from "@testing-library/react";

import Calendar from "./Calendar";

describe("Calendar", () => {
  test("renders the Calendar Componet", () => {
    //
    const setDates = jest.fn();
    render(<Calendar startDate={new Date().toISOString()} setDates={setDates} />);
  });
});
