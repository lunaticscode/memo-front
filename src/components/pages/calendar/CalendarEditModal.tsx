import { FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarItem } from "../../../pages/CalendarDetail";
import { isEmptyObject } from "../../../libs/utils/typeValidate";
import { api } from "../../../libs/utils/api";

interface CalendarEditModalProps {
  labelData: any;
  data: CalendarItem;
  open?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (data: CalendarItem) => void;
}
const defaultSelectedLabel = "GREEN";
const CalendarEditModal: FC<CalendarEditModalProps> = ({
  //   content: contentProp,
  //   id,
  //   label,
  data,
  labelData,
  open = false,
  isLoading = false,
  onCancel,
  onSubmit,
}) => {
  const [selectedLabel, setSelectedLabel] = useState<string>(data.label);
  console.log({ label: data.label });
  const [content, setContent] = useState<string>(data.content);

  useEffect(() => {
    const labelKey =
      Object.keys(labelData).find(
        (_, index) => Object.values(labelData)[index] === data.label
      ) || "GREEN";
    setSelectedLabel(labelKey as string);
    setContent(data.content);
  }, [data]);

  const handleClickCancel = () => {
    onCancel?.();
  };

  const handleClickUpdate = async () => {
    if (isLoading) return;
    if (content && selectedLabel && data.id) {
      onSubmit?.({ id: data.id, content, label: selectedLabel });
    }
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const modalContent = useMemo(
    () => (
      <>
        <div className="calendar-editmodal-mask" />
        <div className="calendar-editmodal-wrapper">
          <div className="calendar-editmodal-form">
            <div
              className={"calendar-form-hedaer"}
              style={{ marginBottom: "10px" }}
            >
              <div className={"calendar-form-title"}>일정 수정</div>
              {!isEmptyObject(labelData) && (
                <div
                  className={"calendar-labellist-wrapper"}
                  // style={{ float: "right" }}
                >
                  {Object.keys(labelData).map((color) => (
                    <div
                      onClick={() => {
                        setSelectedLabel(color);
                      }}
                      className={"calendar-label-item small"}
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
            <div className={"calendar-editmodal-btn-wrapper"}>
              <div
                className={"calendar-editmodal-btn submit"}
                style={{
                  backgroundColor: isLoading
                    ? "#eeeeee"
                    : labelData[selectedLabel],
                }}
                onClick={handleClickUpdate}
              >
                완료
              </div>
              <div
                className={"calendar-editmodal-btn cancel"}
                style={{ backgroundColor: "lightgray" }}
                onClick={handleClickCancel}
              >
                취소
              </div>
            </div>
          </div>
        </div>
      </>
    ),
    [labelData, content, handleClickCancel, selectedLabel]
  );
  return open ? createPortal(modalContent, document.body) : null;
};
export default CalendarEditModal;
