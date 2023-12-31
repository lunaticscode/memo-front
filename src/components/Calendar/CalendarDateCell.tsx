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
import { isEmptyObject } from "../../libs/utils/typeValidate";

const formDateByCellType = (date: Date, type: DateCellType) => {
  if (type === "day") {
    return date.getDate();
  }
  if (type === "week") {
    return `${date.getDate()}`;
  }
};

const setDateCellContentByType = (dataList: Array<any>, type: DateCellType) => {
  if (type === "day") {
    const dataListByLabel = dataList.reduce((acc, cur) => {
      cur.label in acc ? acc[cur.label].push(cur) : (acc[cur.label] = [cur]);
      return acc;
    }, {});

    return !isEmptyObject(dataListByLabel) ? (
      <>
        {Object.keys(dataListByLabel).map((label) => (
          <div
            className={"date-cell-count"}
            key={`data-label-${label}`}
            style={{ backgroundColor: label }}
          />
        ))}
        {/* <div className={dataList.length ? "date-cell-count" : ""}>
          {dataList.length ? dataList.length : ""}
        </div> */}
      </>
    ) : null;
  }
  if (type === "week") {
    return (
      <>
        {dataList.map((data) => (
          <div
            className={`date-cell-content`}
            key={`date-cell-content-${data.id}`}
          >
            {data.content}
          </div>
        ))}
      </>
    );
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
    calendarDataList,
  } = useContext(CalendarContext);
  const handleClickDateCell = useCallback(
    (e: MouseEvent) => {
      // console.log(e.detail);
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

  const dateCellInfo = useMemo(() => {
    return (
      calendarDataList?.filter((data) =>
        isSameDateYmd(new Date(data.targetDate), date)
      ) || []
    );
  }, [calendarDataList, date]);

  return (
    <>
      <div className={dateCellCls} onClick={handleClickDateCell}>
        <div>{formDateByCellType(date, type)}</div>
        {/* {children} */}
        {setDateCellContentByType(dateCellInfo, type)}
      </div>
    </>
  );
};

export default CalendarDateCell;
