import React, { MouseEvent, useLayoutEffect, useState } from "react";
import {
  DAYS,
  DAY_IN_MILLISECONDS,
  getDatesBetween,
  getMonthDays,
  initMonth,
  isToday,
  MONTHS,
} from "../../helpers";
import "./Calendar.css";

export interface ICalendarProps {
  startDate: string;
  endDate?: string;
  setDates: React.Dispatch<
    React.SetStateAction<
      | {
          startDate: number | undefined;
          endDate: number | undefined;
        }
      | undefined
    >
  >;
}

const Calendar: React.FC<ICalendarProps> = ({ setDates, ...props }) => {
  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [activeMonthIdx, setActiveMonthIdx] = useState<number>(0);
  const [startDate, setStartDate] = useState<number | undefined>(0);
  const [datesBetween, setDatesBetween] = useState<number[]>([]);
  const [endDate, setEndDate] = useState<number | undefined>(0);

  useLayoutEffect(() => {
    let tempStartDate = new Date(props.startDate).getTime();
    let tempEndDate = new Date(
      props.endDate ? props.endDate : props.startDate
    ).getTime();

    const diff = Math.abs(tempEndDate - tempStartDate);

    let endDateCounter = tempStartDate;
    if (diff % DAY_IN_MILLISECONDS !== 0) {
      while (
        new Date(endDateCounter).toDateString() !==
        new Date(tempEndDate).toLocaleString()
      ) {
        endDateCounter = endDateCounter + DAY_IN_MILLISECONDS;
      }

      tempEndDate = endDateCounter;
    }

    setStartDate(tempStartDate);
    setEndDate(tempEndDate);

    setMonthDays(initMonth(tempStartDate, setActiveMonthIdx));
  }, [props.startDate, props.endDate]);

  const handleDatePick = (e: MouseEvent<HTMLButtonElement>, val: number) => {
    e.preventDefault();
    if (!startDate) {
      setStartDate(val);
      setDatesBetween([val]);
    } else {
      if (val < startDate) {
        setEndDate(startDate);
        setStartDate(val);
        setDatesBetween(getDatesBetween(val, startDate));
        setDates({ startDate: val, endDate: startDate });
      } else if (val > startDate) {
        setEndDate(val);
        setDatesBetween(getDatesBetween(startDate, val));
        setDates({ startDate, endDate: val });
      } else {
        setStartDate(val);
        setEndDate(val);
        setDates({ startDate: val, endDate: val });
        setDatesBetween(getDatesBetween(val, val));
      }
    }
  };

  const handlePrevClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let tempMonthIdx = 0;
    if (activeMonthIdx === 0) {
      tempMonthIdx = 11;
      // setActiveMonthIdx(11);
    } else {
      tempMonthIdx = activeMonthIdx - 1;
      // setActiveMonthIdx(activeMonthIdx - 1);
    }

    const tempMonthDays = getMonthDays(
      monthDays[0] - DAY_IN_MILLISECONDS,
      false,
      tempMonthIdx
    );
    setActiveMonthIdx(tempMonthIdx);
    setMonthDays([...tempMonthDays]);
  };

  const handleNextClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let tempMonthIdx = 0;
    if (activeMonthIdx === 11) {
      tempMonthIdx = 0;
      // setActiveMonthIdx(0);
    } else {
      tempMonthIdx = activeMonthIdx + 1;
      // setActiveMonthIdx(activeMonthIdx + 1);
    }
    const tempMonthDays = getMonthDays(
      monthDays[34] + DAY_IN_MILLISECONDS,
      true,
      tempMonthIdx
    );
    setActiveMonthIdx(tempMonthIdx);
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
        {monthDays.map((date: number, idx: number) => {
          const _isToday = isToday(new Date(date));
          const _isSelected = datesBetween.find((d) => d === date);
          return (
            <button
              key={idx}
              className={`drp-date ${_isToday ? `today` : ``} ${
                _isSelected ? `selected` : ``
              }`}
              onClick={(e) => handleDatePick(e, date)}
            >
              {new Date(date).getDate()}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => {
          setStartDate(undefined);
          setEndDate(undefined);
          setDatesBetween([]);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Calendar;
