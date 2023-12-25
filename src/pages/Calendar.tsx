import { FC, useEffect, useState, Children } from "react";
import Calendar, { DateCellType } from "../components/Calendar";
import { api } from "../libs/utils/api";
import { useNavigate } from "react-router-dom";

interface CalendarPageProps {}
const CalendarPage: FC<CalendarPageProps> = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const [type, setType] = useState<DateCellType>("day");
  const [calendarDataList, setCalendarDataList] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const handleChangeDate = (date: Date, type: DateCellType) => {
    console.log(nowDate);
    setType(type);
    setNowDate(date);
    if (type === "day") {
      if (nowDate.getMonth() !== date.getMonth()) {
        setCalendarData(date, type);
      }
    }
  };

  useEffect(() => {
    console.log({ nowDate });
  }, [nowDate]);

  const setCalendarData = async (targetDate: Date, type: DateCellType) => {
    console.log("fetch calendar data ....", nowDate);
    const fetchResult = await api.post("/calendar", {
      targetDate,
      type,
      owner: localStorage.getItem("user"),
    });
    console.log("fetchResult.data", fetchResult.data);

    if (!fetchResult.data) {
      alert("캘린더 정보 불러오기 실패");
      return;
    }
    setCalendarDataList(fetchResult.data || []);
  };

  const handleDoubleClickDate = async (date: Date) => {
    const query = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
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
