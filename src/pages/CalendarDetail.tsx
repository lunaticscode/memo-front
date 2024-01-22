import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertDateToString } from "../libs/utils/date";
import { api } from "../libs/utils/api";
import TrashIcon from "../components/icons/TranshIcon";
import { isEmptyObject } from "../libs/utils/typeValidate";
import EditIcon from "../components/icons/EditIcon";

export type CalendarItem = {
  content: string;
  id: number;
  label: string;
};
const defaultSelectedLabel = "GREEN";

const CalendarDetailPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [defaultDataList, setDefaultDataList] = useState<Array<CalendarItem>>(
    []
  );
  const [content, setContent] = useState<string>("");
  const [selectedLabel, setSelectedLabel] =
    useState<string>(defaultSelectedLabel);
  const [labelData, setLabelData] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const query = new URLSearchParams(search || "");
  const targetDate = query.get("date");

  const [updateData, setUpdateData] = useState<CalendarItem>({
    content: "",
    id: -1,
    label: "",
  });

  const detailTitle = useMemo(
    () =>
      convertDateToString(new Date(`${targetDate} 00:00:00`)).split("일")[0] +
      "일",
    [targetDate]
  );
  const setDefaultData = async () => {
    setIsLoading(true);
    // const fetchResult = await api.get("/calendar", {
    //   params: { owner: localStorage.getItem("user"), targetDate },
    // });
    // const fetchLabelList = await api.get("/calendar/label");
    // console.log(fetchLabelList.data);
    const _fetchResult = await Promise.all([
      api.get("/calendar", {
        params: { owner: localStorage.getItem("user"), targetDate },
      }),
      api.get("/calendar/label"),
    ]);
    setIsLoading(false);
    if (_fetchResult) {
      if (_fetchResult[0] && _fetchResult[0].data) {
        setDefaultDataList(_fetchResult[0].data);
      }
      if (_fetchResult[1] && _fetchResult[1].data) {
        setLabelData(_fetchResult[1].data);
      }
    }
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleClickSubmit = async () => {
    if (!content || !content.toString().trim()) {
      alert("최소 1글자 이상 작성해주세요.");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const submitResult = await api.post("/calendar/add", {
      content,
      targetDate,
      owner: localStorage.getItem("user"),
      label: selectedLabel,
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
  const handleClickUpdate = async (data: CalendarItem) => {
    const { id, ...updateData } = data;
    // const updateResult = await api.put(`/calendar/${data.id}`, updateData);
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
          <div
            className={"calendar-detail-item-divider"}
            style={{ backgroundColor: defaultContent.label }}
          ></div>
          {defaultContent.content}
          <div className={"calendar-detail-item-icon-wrapper"}>
            <TrashIcon
              className={"calendar-detail-item-icon delete"}
              onClick={() => handleClickDelete(defaultContent?.id)}
              width={18}
            />
            <EditIcon
              className={"calendar-detail-item-icon update"}
              onClick={() => handleClickUpdate(defaultContent)}
              width={18}
            />
          </div>
        </div>
      ))}

      <div className="calendar-form-wrapper">
        <div className={"calendar-form-hedaer"}>
          <div className={"calendar-form-title"}>일정 추가</div>
          {!isEmptyObject(labelData) && (
            <div className={"calendar-labellist-wrapper"}>
              {Object.keys(labelData).map((color) => (
                <div
                  onClick={() => setSelectedLabel(color)}
                  className={"calendar-label-item"}
                  key={`calendar-label-item-${color}`}
                  style={{
                    backgroundColor: labelData[color],
                    boxShadow: `0px 0px 7px ${
                      selectedLabel === color ? labelData[color] : "white"
                    }`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <textarea
          className={"calendar-form-textarea"}
          onChange={handleChangeContent}
          style={{ whiteSpace: "pre-line" }}
          value={content}
        ></textarea>
        <button
          className={
            isLoading ? "calendar-form-submit loading" : "calendar-form-submit"
          }
          style={{
            backgroundColor: labelData[selectedLabel] || "",
          }}
          onClick={handleClickSubmit}
        >
          add
        </button>
      </div>
    </div>
  );
};
export default CalendarDetailPage;
