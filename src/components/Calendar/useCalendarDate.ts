import { useContext, useMemo } from "react";
import { CalendarContext, DateCellType } from ".";

const isMemorize = (date: Date, type: DateCellType = "day") => {
  if (type === "day") {
    return `${date.getFullYear()}-${date.getMonth()}`;
  }

  if (type === "month") {
    return `${date.getFullYear()}`;
  }
  return date;
};

const getDays = (date: Date): Array<Date> => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDate = new Date(year, month, 1);
  const firstDay = firstDate.getDay();
  const monthlyFirstDate = new Date(
    firstDate.getTime() - 3600 * 24 * 1000 * firstDay
  );

  const lastDate = new Date(year, month + 1, 0);
  const lastDay = lastDate.getDay();
  const monthlyLastDate = new Date(
    lastDate.getTime() + 3600 * 24 * 1000 * (6 - lastDay)
  );

  const dayLength =
    (monthlyLastDate.getTime() - monthlyFirstDate.getTime()) /
      (3600 * 24 * 1000) +
    1;

  return Array.from(
    { length: dayLength },
    (_, index) =>
      new Date(monthlyFirstDate.getTime() + 3600 * 24 * 1000 * index)
  );
};

const getWeeks = (date: Date) => {
  const targetDateDay = date.getDay();
  const weeklyFirstData = new Date(
    date.getTime() - 3600 * 24 * 1000 * targetDateDay
  );

  return Array.from(
    { length: 7 },
    (_, index) => new Date(weeklyFirstData.getTime() + 3600 * 24 * 1000 * index)
  );
};

const getMonths = (date: Date): Array<Date> => {
  return [];
};
const getYears = (date: Date): Array<Date> => {
  return [];
};

const getDateCellListByType = (date: Date, type: DateCellType = "month") => {
  const mapTypeToDateCell: {
    [key in DateCellType]: () => Array<Date>;
  } = {
    day: () => getDays(date),
    week: () => getWeeks(date),
    month: () => getMonths(date),
    year: () => getYears(date),
  };
  return mapTypeToDateCell[type]();
};

const useCalendarDate = () => {
  const { value = new Date(), type } = useContext(CalendarContext);
  const dateList = useMemo(
    () => getDateCellListByType(value, type),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMemorize(value, type)]
  );
  return {
    dateList,
  };
};
export default useCalendarDate;
