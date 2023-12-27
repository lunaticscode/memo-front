import { useContext, useMemo } from "react";
import { CalendarContext } from ".";
import { isSameDateYmd } from "../../libs/utils/date";

const CalendarFooter = () => {
  const { value, calendarDataList } = useContext(CalendarContext);

  const targetDatePlan = useMemo(() => {
    return calendarDataList?.filter((data) =>
      isSameDateYmd(value || new Date(), new Date(data.targetDate))
    );
  }, [value, calendarDataList]);

  return (
    <div className="calendar-footer-planboard">
      {targetDatePlan?.map((plan) => (
        <div className="calendar-footer-planboard-item" key={plan.id}>
          <div className={"calendar-footer-planboard-item-divider"}></div>
          {plan.content}
        </div>
      ))}
    </div>
  );
};
export default CalendarFooter;
