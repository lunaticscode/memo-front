import { FC, PropsWithChildren } from "react";

interface CalendarHeaderProps extends PropsWithChildren {}
const CalendarHeader: FC<CalendarHeaderProps> = ({ children }) => {
  return <>{children}</>;
};
export default CalendarHeader;
