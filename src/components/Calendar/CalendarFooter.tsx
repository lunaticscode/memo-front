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

  return targetDatePlan &&
    Array.isArray(targetDatePlan) &&
    targetDatePlan.length ? (
    <div className="calendar-footer-planboard">
      {targetDatePlan.map((plan) => (
        <div className="calendar-footer-planboard-item" key={plan.id}>
          <div
            className={"calendar-footer-planboard-item-divider"}
            style={{ backgroundColor: plan.label }}
          ></div>
          {plan.content}
        </div>
      ))}
    </div>
  ) : null;
};
export default CalendarFooter;
