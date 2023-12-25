import { FC, PropsWithChildren, useContext, useMemo } from "react";
import { CalendarContext, DateCellType } from ".";
import CalendarNavigator from "./CalendarNavgiator";

const getHeaderTitle = (date: Date, type?: DateCellType) => {
  if (type === "day") {
    return `${date?.getFullYear()}-${date?.getMonth() + 1}`;
  }
};
interface CalendarHeaderProps extends PropsWithChildren {}
const CalendarHeader: FC<CalendarHeaderProps> = ({ children }) => {
  const { value = new Date(), type } = useContext(CalendarContext);
  const headerTitle = useMemo(() => getHeaderTitle(value, type), [value, type]);
  return (
    <div className={"calendar-header"}>
      {headerTitle}
      <CalendarNavigator />
    </div>
  );
};
export default CalendarHeader;
