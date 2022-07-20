import React, { useEffect, useState, MouseEvent } from "react";
import {
  DAYS,
  DAY_IN_MILLISECONDS,
  getMonthDays,
  initMonth,
  MONTHS,
} from "../helpers";

interface ICalendarProps {
  startDate: number;
  endDate?: number;
}

export default function Calendar(props: ICalendarProps) {
  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);

  useEffect(() => {
    setMonthDays(initMonth(new Date().getTime(), setActiveMonthIdx));
  }, []);

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tempMonthDays = getMonthDays(
      monthDays[0] - DAY_IN_MILLISECONDS,
      false
    );
    if (activeMonthIdx === 0) {
      setActiveMonthIdx(11);
    } else {
      setActiveMonthIdx(activeMonthIdx - 1);
    }
    setMonthDays([...tempMonthDays]);
  };
  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tempMonthDays = getMonthDays(
      monthDays[34] + DAY_IN_MILLISECONDS,
      true
    );
    if (activeMonthIdx === 11) {
      setActiveMonthIdx(0);
    } else {
      setActiveMonthIdx(activeMonthIdx + 1);
    }
    setMonthDays([...tempMonthDays]);
  };

  return (
    <div className="drp_calendar_wrapper">
      <div className="drp_next_prev_btns_wrapper">
        <button onClick={handlePrevClick}>Prev</button>
        <span>{MONTHS[activeMonthIdx]}</span>
        <button onClick={handleNextClick}>Next</button>
      </div>
      <div className="drp_day_labels_wrapper">
        {DAYS.map((day: string, idx: number) => (
          <div key={idx}>{day}</div>
        ))}
      </div>
      <div className="drp_days_wrapper">
        {monthDays.map((date: number, idx: number) => (
          <button key={idx} className="drp-date">
            {new Date(date).getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
