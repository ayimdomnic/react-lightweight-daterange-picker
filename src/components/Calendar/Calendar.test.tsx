import React from "react";

import { render } from "@testing-library/react";

import Calendar from "./Calendar";

// jest.mock('react-dom/test-utils', () => ({}))

describe("Calendar", () => {
  test("renders the Calendar Componet", () => {
    const [dates, setDates] = React.useState<{
      startDate: number | undefined;
      endDate: number | undefined;
    }>();
    render(
      <Calendar startDate={new Date().toISOString()} setDates={setDates} />
    );
  });
});
