import { FC, PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { CalendarContext, DateCellType } from ".";
import { isSameDateYmd, isTodayDate } from "../../libs/utils/date";

const formDateByCellType = (date: Date, type: DateCellType) => {
  if (type === "day") {
    return date.getDate();
  }
  if (type === "week") {
    return `${date.getDate()}`;
  }
};

const calendarDateCellBaseCls = "calendar-date-cell";
interface CalendarDateCellProps extends PropsWithChildren {
  type?: DateCellType;
  date: Date;
}
const CalendarDateCell: FC<CalendarDateCellProps> = ({
  children,
  date,
  type = "day",
}) => {
  const { onClickDate, value = new Date() } = useContext(CalendarContext);
  const handleClickDateCell = useCallback(() => {
    onClickDate?.(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const dateCellCls = useMemo(() => {
    if (isSameDateYmd(value, date)) {
      return `${calendarDateCellBaseCls} ${type} active`;
    }
    if (isTodayDate(date)) {
      return `${calendarDateCellBaseCls} ${type} today`;
    }

    return `${calendarDateCellBaseCls} ${type}`;
  }, [value, date, type]);

  return (
    <>
      <div className={dateCellCls} onClick={handleClickDateCell}>
        <div>{formDateByCellType(date, type)}</div>
        {children}
      </div>
    </>
  );
};

export default CalendarDateCell;
