export const DAYS = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];

export const MONTHS_LENGTH = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const MONTH_BOXES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const initMonth = (timestamp: number, setActiveMonthIdx: any) => {
  // This function will only be called on mount
  const tempDate = new Date(timestamp);

  setActiveMonthIdx(tempDate.getMonth());

  const actualDate = tempDate.getUTCDate();

  const datesBefore = MONTH_BOXES.slice(0, actualDate);

  const datesAfter = MONTH_BOXES.slice(actualDate);

  let output: number[] = [];

  for (let i = 0; i < datesBefore.length; i++) {
    output = [timestamp - DAY_IN_MILLISECONDS * i, ...output];
  }

  for (let i = 0; i < datesAfter.length; i++) {
    output = [...output, timestamp + DAY_IN_MILLISECONDS * (i + 1)];
  }

  // Index 0 of output will always be the first date of the month
  const firstDayInOutput = output[0];
  const firstDayPositionInTheWeek = new Date(firstDayInOutput).getUTCDay();

  if (firstDayPositionInTheWeek !== 0) {
    let preceedingDaysCount = firstDayPositionInTheWeek;
    for (let i = 0; i < preceedingDaysCount; i++) {
      output = [firstDayInOutput - DAY_IN_MILLISECONDS * (i + 1), ...output];
    }
  }

  return output.slice(0, 35);
};

export const getMonthDays = (timestamp: number, next: boolean): number[] => {
  let output: number[] = [];

  if (next) {
    for (let i = 0; i < MONTH_BOXES.length; i++) {
      output = [...output, timestamp + DAY_IN_MILLISECONDS * i];
    }
  } else {
    for (let i = 0; i < 35; i++) {
      output = [timestamp - DAY_IN_MILLISECONDS * i, ...output];
    }
  }

  return output;
};
