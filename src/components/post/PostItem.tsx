import { FC, useContext } from "react";
import { PostContext } from "../../pages/Post";

export interface PostItemProps {
  id: string;
  content: string;
  createdAt: string;
}

const PostItem: FC<PostItemProps> = ({ id, content }) => {
  const { onClickPostItem } = useContext(PostContext);
  const handleClickItem = () => {
    onClickPostItem?.(id, "view");
  };
  console.log(id);
  return (
    <div
      style={{ whiteSpace: "pre-line" }}
      className={`post-item`}
      onClick={handleClickItem}
    >
      {content}
    </div>
  );
};
export default PostItem;
