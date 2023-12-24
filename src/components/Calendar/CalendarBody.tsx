import { FC, useContext, useMemo } from "react";
import { CalendarContext } from ".";
import useCalendarDate from "./useCalendarDate";
import CalendarDateCell from "./CalendarDateCell";

const calendarBodyBaseCls = "calendar-date-body";
const CalendarBody: FC = () => {
  const { type = "day" } = useContext(CalendarContext);
  const { dateList } = useCalendarDate();

  const calendarBodyCls = useMemo(
    () => `${calendarBodyBaseCls} ${type}`,
    [type]
  );

  return (
    <div className={calendarBodyCls}>
      {dateList?.map((date, index) => (
        <CalendarDateCell key={`date-cell-${index}`} date={date} type={type} />
      ))}
    </div>
  );
};
export default CalendarBody;
