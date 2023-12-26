import { FC, useEffect, useState } from "react";
import Calendar, { DateCellType } from "../components/Calendar";
import { api } from "../libs/utils/api";
import { useNavigate } from "react-router-dom";
import { convertDatetoYmdString } from "../libs/utils/date";

interface CalendarPageProps {}
const CalendarPage: FC<CalendarPageProps> = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const [type, setType] = useState<DateCellType>("day");
  const [calendarDataList, setCalendarDataList] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const handleChangeDate = (date: Date, type: DateCellType) => {
    // console.log(nowDate);
    setType(type);
    setNowDate(date);
    if (type === "day") {
      if (nowDate.getMonth() !== date.getMonth()) {
        setCalendarData(date, type);
      }
    }
  };

  const setCalendarData = async (targetDate: Date, type: DateCellType) => {
    const fetchResult = await api.post("/calendar", {
      targetDate,
      type,
      owner: localStorage.getItem("user"),
    });

    if (!fetchResult.data) {
      alert("캘린더 정보 불러오기 실패");
      return;
    }
    setCalendarDataList(fetchResult.data || []);
  };

  const handleDoubleClickDate = async (date: Date) => {
    const query = convertDatetoYmdString(date);
    navigate(`/calendar/detail?date=${query}`);
  };

  useEffect(() => {
    setCalendarData(nowDate, type);
  }, []);
  return (
    <>
      <Calendar
        calendarDataList={calendarDataList}
        value={nowDate}
        onChange={handleChangeDate}
        onDoubleClickDate={handleDoubleClickDate}
      />
    </>
  );
};
export default CalendarPage;
