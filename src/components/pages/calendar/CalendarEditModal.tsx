import { FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarItem } from "../../../pages/CalendarDetail";

interface CalendarEditModalProps extends CalendarItem {
  labelList: Array<string>;
  open: boolean;
}
const CalendarEditModal: FC<CalendarEditModalProps> = ({
  content,
  id,
  label,
  labelList,
  open: openProp = false,
}) => {
  const [open, setIsOpen] = useState<boolean>(openProp);
  const handleClickCancel = () => {
    setIsOpen(false);
  };
  const modalContent = useMemo(() => <div>CalendarEditModal</div>, []);
  return open ? createPortal(modalContent, document.body) : null;
};
export default CalendarEditModal;
