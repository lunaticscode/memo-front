import { FC, useContext } from "react";
import { PostContext } from "../../pages/Post";
import { convertDateToString } from "../../libs/utils/date";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../icons/HeartIcon";

export interface PostItemProps {
  id: string;
  content: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ id, content, createdAt }) => {
  const { onClickPostItem } = useContext(PostContext);
  const navigate = useNavigate();
  const handleClickItem = () => {
    onClickPostItem?.(id, "view");
  };

  return (
    <div className={`post-item`} onClick={() => navigate(`/post?id=${id}`)}>
      <div className={`post-item-date`}>
        {convertDateToString(new Date(new Date(createdAt).getTime()), true)}
      </div>
      <div
        className={`post-item-content`}
        style={{ whiteSpace: "pre-line" }}
        onClick={handleClickItem}
      >
        {content}
      </div>
      <div className={"post-item-reaction-wrapper"}>
        <HeartIcon width={18} />
      </div>
    </div>
  );
};
export default PostItem;
