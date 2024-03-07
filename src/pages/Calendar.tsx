import { FC, useEffect, useState } from "react";
import Calendar, { DateCellType } from "../components/Calendar";
import { api } from "../libs/utils/api";
import { useNavigate } from "react-router-dom";
import { convertDatetoYmdString } from "../libs/utils/date";
import { isEmptyObject } from "../libs/utils/typeValidate";

interface CalendarPageProps {}
const CalendarPage: FC<CalendarPageProps> = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const [type, setType] = useState<DateCellType>("day");
  const [calendarDataList, setCalendarDataList] = useState<Array<any>>([]);
  const [labelData, setLabelData] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const setDefaultLabelData = async () => {
    const fetchResult = await api.get("/calendar/label");
    if (!fetchResult || !fetchResult.data || isEmptyObject(fetchResult.data)) {
      return setLabelData({});
    }
    setLabelData(fetchResult.data);
  };

  const setCalendarData = async (targetDate: Date, type: DateCellType) => {
    const fetchResult = await api.post("/calendar", {
      targetDate: convertDatetoYmdString(targetDate),
      type,
      owner: localStorage.getItem("user"),
    });

    if (!fetchResult.data) {
      alert("캘린더 정보 불러오기 실패");
      return;
    }
    setCalendarDataList(fetchResult.data || []);
  };

  const handleChangeDate = (date: Date, type: DateCellType) => {
    setType(type);
    setNowDate(date);
    if (type === "day") {
      if (nowDate.getMonth() !== date.getMonth()) {
        setCalendarData(new Date(date.getTime() + 1000), type);
      }
    }
  };

  const handleDoubleClickDate = async (date: Date) => {
    const query = convertDatetoYmdString(date);
    navigate(`/calendar/detail?date=${query}`);
  };

  useEffect(() => {
    setCalendarData(nowDate, type);
    setDefaultLabelData();
  }, []);
  const handleClickAlarm = async () => {
    const result = await api.post("/fcm/broadcast", {
      title: "test-title",
      content: "test-content",
    });
    console.log({ result });
  };
  return (
    <>
      <button onClick={handleClickAlarm}>alarm-test</button>
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
