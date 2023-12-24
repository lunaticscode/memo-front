import {
  FC,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { CalendarContext, DateCellType } from ".";
import {
  isSameDateYmd,
  isTodayDate,
  isNotIncludeMonth,
} from "../../libs/utils/date";

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
  const {
    onClickDate,
    onDoubleClickDate,
    value = new Date(),
  } = useContext(CalendarContext);
  const handleClickDateCell = useCallback(
    (e: MouseEvent) => {
      console.log(e.detail);
      onClickDate?.(date);
      if (e.detail === 2) {
        onDoubleClickDate?.(date);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [date]
  );

  const dateCellCls = useMemo(() => {
    if (isNotIncludeMonth(value, date)) {
      return `${calendarDateCellBaseCls} ${type} notmonth`;
    }
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
