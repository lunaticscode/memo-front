import {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import PostList from "../components/post/PostList";
import PostModal from "../components/post/PostModal";
import { useNavigate } from "react-router-dom";
import { api } from "../libs/utils/api";
// const dummyItems = Array.from({ length: 20 }, (_, index) => ({
//   id: `${index}-post`,
//   content: index.toString(36),
//   createdAt: new Date().toISOString(),
// }));
interface PostContextProps {
  onClickPostItem: (id: string, mode: "create" | "view") => void;
  loadMorePost: (cursor: number) => void;
  //   selectedPostItemId: string;
  //   setSelectedPostItemId: Dispatch<React.SetStateAction<string>>;
}
export const PostContext = createContext<PostContextProps>({
  onClickPostItem: () => {},
  loadMorePost: () => {},
  //   selectedPostItemId: "",
  //   setSelectedPostItemId: () => {},
});

interface PostPageProps {}
const PostPage: FC<PostPageProps> = () => {
  const navigate = useNavigate();
  const [postItems, setPostItems] = useState([]);
  const [modalVisble, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "view">("create");

  const MemoPostList = useMemo(() => {
    return <PostList items={postItems} />;
  }, [postItems]);

  const handleClickAdd = useCallback(() => {
    // setModalVisible(true);
    // setModalMode("create");
    navigate("/postedit");
  }, []);
  const onClickPostItem = (id: string, mode?: "create" | "view") => {
    setModalVisible(true);
    setModalMode(mode || "create");
  };

  const loadMorePost = (cursor: number) => {};

  const contextValue = {
    onClickPostItem,
    loadMorePost,
  };

  const setPostItemData = async () => {
    const fetchResult = await api
      .get(`/post/${localStorage.getItem("user")}`)
      .then((res) => res.data);
    console.log(fetchResult);
    if (fetchResult.result) {
      setPostItems(fetchResult.data);
    }
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
