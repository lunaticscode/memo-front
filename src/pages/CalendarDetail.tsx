import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertDateToString } from "../libs/utils/date";
import { api } from "../libs/utils/api";
import TrashIcon from "../components/icons/TranshIcon";

const CalendarDetailPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [defaultDataList, setDefaultDataList] = useState<
    Array<{ content?: string; id: number }>
  >([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const query = new URLSearchParams(search || "");
  const targetDate = query.get("date");

  const detailTitle = useMemo(
    () =>
      convertDateToString(new Date(`${targetDate} 00:00:00`)).split("일")[0] +
      "일",
    [targetDate]
  );
  const setDefaultData = async () => {
    setIsLoading(true);
    const fetchResult = await api.get("/calendar", {
      params: { owner: localStorage.getItem("user"), targetDate },
    });
    setIsLoading(false);
    if (fetchResult.data) {
      setDefaultDataList(fetchResult.data);
    }
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleClickSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const submitResult = await api.post("/calendar/add", {
      content,
      targetDate,
      owner: localStorage.getItem("user"),
    });
    if (submitResult) {
      navigate(0);
    } else {
      alert("일정 추가 실패");
    }
    setIsLoading(false);
  };

  const handleClickDelete = async (targetId: number) => {
    if (isLoading) return;
    setIsLoading(true);
    const deleteResult = await api.delete(`/calendar/${targetId}`);
    setIsLoading(false);
    if (deleteResult.data.result) {
      setDefaultData();
    }
  };

  useEffect(() => {
    setDefaultData();
  }, []);

  return (
    <div className={"calendar-detail-wrapper"}>
      <div className={"calendar-detail-header"}>{detailTitle}</div>
      {isLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
      {defaultDataList.map((defaultContent, index) => (
        <div className={"calendar-detail-item"} key={`calendar-data-${index}`}>
          <div className={"calendar-detail-item-divider"}></div>
          {defaultContent.content}
          <div className={"calendar-detail-item-icon-wrapper"}>
            <TrashIcon
              onClick={() => handleClickDelete(defaultContent.id)}
              width={18}
            />
          </div>
        </div>
      ))}

      <textarea
        className={"postedit-textarea"}
        onChange={handleChangeContent}
        style={{ whiteSpace: "pre-line" }}
        value={content}
      ></textarea>
      <button
        className={isLoading ? "postedit-submit loading" : "postedit-submit"}
        onClick={handleClickSubmit}
      >
        add
      </button>
    </div>
  );
};
export default CalendarDetailPage;
