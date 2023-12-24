import { FC, useContext, MouseEvent } from "react";
import { PostContext } from "../../pages/Post";
import { convertDateToString } from "../../libs/utils/date";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon";

export interface PostItemProps {
  id: string;
  content: string;
  createdAt: string;
  like: number;
}

const PostItem: FC<PostItemProps> = ({ id, content, createdAt, like }) => {
  const { onClickPostLike } = useContext(PostContext);
  const navigate = useNavigate();
  const handleClickItem = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.nodeName === "DIV") {
      navigate(`/post?id=${id}`);
    }
  };

  const handleClickLike = () => {
    onClickPostLike?.(id, like ? 0 : 1);
  };

  return (
    <div className={`post-item`} onClick={handleClickItem}>
      <div className={`post-item-date`}>
        {convertDateToString(new Date(new Date(createdAt).getTime()), true)}
      </div>
      <div className={`post-item-content`} style={{ whiteSpace: "pre-line" }}>
        {content}
      </div>
      <div className={"post-item-reaction-wrapper"}>
        <HeartIcon
          width={20}
          stroke={"silver"}
          strokeWidth={0.5}
          fill={like ? "red" : "white"}
          onClickCapture={handleClickLike}
        />
      </div>
    </div>
  );
};
export default PostItem;
