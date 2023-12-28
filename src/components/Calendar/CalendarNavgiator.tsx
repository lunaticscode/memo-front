import { FC, useContext } from "react";
import { CalendarContext } from ".";
import ArrowLeft from "../icons/ArrowLeft";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";

const CalendarNavigator = () => {
  const { onClickDate, value = new Date(), type } = useContext(CalendarContext);
  const handleClickNav = (direction: number) => {
    if (type === "day") {
      const changedMonth = value.getMonth() + direction;
      onClickDate(new Date(value.getFullYear(), changedMonth, value.getDate()));
    }
  };
  return (
    <div className={`calendar-navigator-wrapper`}>
      <ChevronLeftIcon width={20} onClick={() => handleClickNav(-1)} />
      <ChevronLeftIcon
        width={20}
        style={{ rotate: "180deg" }}
        onClick={() => handleClickNav(1)}
      />
    </div>
  );
};
export default CalendarNavigator;
