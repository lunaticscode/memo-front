import { FC, useContext } from "react";
import { PostContext } from "../../pages/Post";
import { convertDateToString } from "../../libs/utils/date";

export interface PostItemProps {
  id: string;
  content: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ id, content, createdAt }) => {
  const { onClickPostItem } = useContext(PostContext);
  const handleClickItem = () => {
    onClickPostItem?.(id, "view");
  };

  return (
    <>
      <div className={`post-item-date`}>
        {convertDateToString(new Date(new Date(createdAt).getTime()), true)}
      </div>
      <div
        style={{ whiteSpace: "pre-line" }}
        className={`post-item`}
        onClick={handleClickItem}
      >
        {content}
      </div>
    </>
  );
};
export default PostItem;
