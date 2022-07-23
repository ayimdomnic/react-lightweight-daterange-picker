import React from "react";
import "./Calendar.css";

export interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }) => {
  return (
    <div>
      <h1>Calendar</h1>
      <p>{date.toDateString()}</p>
    </div>
  );
};

export default Calendar;
