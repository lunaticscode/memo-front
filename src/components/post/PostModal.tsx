import { FC, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface PostModalProps {
  mode?: "create" | "view";
  data?: any;
  visible?: boolean;
}

const PostModal: FC<PostModalProps> = ({
  mode = "create",
  data = {},
  visible,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  const handleClickExit = () => {
    setIsVisible(false);
  };

  const modalContent = useMemo(() => {
    if (mode === "create") {
      return (
        <>
          <button>추가</button>
          <button onClick={handleClickExit}>닫기</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={handleClickExit}>닫기</button>
        </>
      );
    }
  }, [mode]);

  return isVisible
    ? createPortal(
        <div className={"modal-content-wrapper"}>{modalContent}</div>,
        document.body
      )
    : null;
};
export default PostModal;
