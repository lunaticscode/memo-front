import { FC, useEffect, useRef, useState } from "react";
import PostItem, { PostItemProps } from "./PostItem";
import useIntersectionObserver from "../../libs/hooks/useIntersectionObserver";

// const _sleep = async (): Promise<void> =>
//   await new Promise((resolve) => setTimeout(() => resolve(), 3000));

interface PostListProps {
  items: Array<PostItemProps>;
}
const PostList: FC<PostListProps> = ({ items }) => {
  const [cursor, setCursor] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const loadMoreData = async () => {
  //     setIsLoading(true);
  //     const nextCursor = cursor + 1;
  //     console.log(cursor);
  //     setCursor(nextCursor);
  //     // await _sleep();
  //     setIsLoading(false);
  //   };

  //   const { setTargetRef } = useIntersectionObserver(loadMoreData, [cursor]);

  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (observerRef && observerRef.current) {
      //   setTargetRef(observerRef);
    }
  }, [observerRef]);
  return (
    <div className={"post-list"}>
      {items.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
      {!isLoading && <div ref={observerRef} />}
    </div>
  );
};
export default PostList;
