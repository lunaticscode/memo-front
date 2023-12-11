import { ChangeEvent, useEffect, useState } from "react";
import { convertDateToString } from "../libs/utils/date";
import { api } from "../libs/utils/api";

const PostEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };
  const handleClickSubmit = async () => {
    setIsLoading(true);
    const owner = localStorage.getItem("user");
    const submitResult = await api
      .post("/post", { owner, content })
      .then((res) => res.data);
    if (submitResult) {
      setContent("");
      alert("저장 완료.");
    } else {
      alert("저장 실패.");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(content);
  }, [content]);
  return (
    <>
      <div className={"postedit-title"}>{convertDateToString(new Date())}</div>
      <textarea
        className={"postedit-textarea"}
        onChange={handleChangeContent}
        style={{ whiteSpace: "pre-line" }}
        value={content}
      />
      <button
        disabled={isLoading}
        onClick={handleClickSubmit}
        className={isLoading ? "postedit-submit loading" : "postedit-submit"}
      >
        저장
      </button>
    </>
  );
};
export default PostEdit;
