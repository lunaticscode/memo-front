import {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PostList from "../components/post/PostList";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/utils/api";
import PostLoading from "../components/PostLoading";

interface PostContextProps {
  onClickPostItem: (id: string, mode: "create" | "view") => void;
  loadMorePost: (cursor: number) => void;
  onClickPostLike: (id: string, like: number) => void;
}
export const PostContext = createContext<PostContextProps>({
  onClickPostItem: () => {},
  loadMorePost: () => {},
  onClickPostLike: () => {},
});

interface PostPageProps {}
const PostPage: FC<PostPageProps> = () => {
  const navigate = useNavigate();
  const [postItems, setPostItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const MemoPostList = useMemo(() => {
    return <PostList items={postItems} />;
  }, [postItems]);

  const handleClickAdd = useCallback(() => {
    navigate("/postedit");
  }, []);
  const onClickPostItem = (id: string, mode?: "create" | "view") => {};

  const onClickPostLike = async (id: string, like: number) => {
    setIsLoading(true);
    const updateLikeResult = await api.put("/post/like", {
      owner: localStorage.getItem("user"),
      id,
      like,
    });
    setIsLoading(false);
    if (updateLikeResult) {
      setPostItemData();
    } else {
      alert("좋아요 업데이트 오류!");
    }
  };

  const loadMorePost = (cursor: number) => {};

  const contextValue = {
    onClickPostItem,
    onClickPostLike,
    loadMorePost,
  };

  const setPostItemData = async () => {
    setIsLoading(true);
    const fetchResult = await api
      .get(`/post/${localStorage.getItem("user")}`)
      .then((res) => res.data);

    if (fetchResult.result) {
      setPostItems(fetchResult.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setPostItemData();
  }, []);

  //   useEffect(() => {
  //     console.log("asdasd");
  //   }, [postItems]);

  return (
    <PostContext.Provider value={contextValue}>
      <div className="post-page-wrapper">
        {MemoPostList}
        {isLoading && <PostLoading />}
        {/* <PostList items={postItems} /> */}
        <div className="post-add-button" onClick={handleClickAdd}>
          + ADD
        </div>
        {/* <PostModal mode={modalMode} visible={modalVisble} /> */}
      </div>
    </PostContext.Provider>
  );
};
export default PostPage;
