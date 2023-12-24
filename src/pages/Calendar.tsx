import { FC } from "react";
import Calendar from "../components/Calendar";

interface CalendarPageProps {}
const CalendarPage: FC<CalendarPageProps> = () => {
  return (
    <>
      <Calendar defaultValue={new Date()} />
    </>
  );
};
export default CalendarPage;
