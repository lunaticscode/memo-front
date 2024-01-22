import { FC, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface CalendarEditModalProps {
  data: any;
}
const CalendarEditModal: FC<CalendarEditModalProps> = ({ data }) => {
  const [open, setIsOpen] = useState<boolean>(false);

  const modalContent = useMemo(() => <div>CalendarEditModal</div>, []);
  return open ? createPortal(modalContent, document.body) : null;
};
export default CalendarEditModal;
