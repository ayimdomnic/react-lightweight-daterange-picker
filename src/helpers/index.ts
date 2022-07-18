export const DAYS = ["MON", "TUE", "WEN", "THU", "FRI", "SAT", "SUN"];

export const MONTHS_LENGTH = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const initMonth = (timestamp: number) => {
  const tempDate = new Date(timestamp);
  const monthNumber = tempDate.getMonth();
  const year = tempDate.getFullYear();
  const monthFirstDate = 9;
};

/**
 * @name getCalendarDays
 * @param firstDate timestamp date at the top left corner in milliseconds
 * @param lastDate timestamp date at the bottom right corner in milliseconds
 * @returns dates array
 */
export const getCalendarDays = (
  firstDate: number,
  lastDate: number
): number[] => {
  const lastDayNumber = new Date(lastDate).getDay();
  const nextMonthDaysCount = lastDayNumber === 6 ? 0 : 6 - lastDayNumber;
  const daysCount =
    (lastDate - firstDate) / DAY_IN_MILLISECONDS + nextMonthDaysCount + 1;

  let output: number[] = [];
  for (let i = 1; i < daysCount + 1; i++) {
    const dateInMs = firstDate + DAY_IN_MILLISECONDS * i;
    output = [...output, dateInMs];
  }
  return output;
};
