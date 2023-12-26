import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { api } from "../libs/utils/api";

const PostDetail = () => {
  const { search } = useLocation();
  const [post, setPost] = useState(null);
  const query = new URLSearchParams(search);
  const postId = query.get("id") || "";

  const getPostInfo = async () => {
    if (postId) {
      const fetchResult = await api(`/post/detail/${postId}`).then(
        (res) => res.data
      );
      setPost(fetchResult || null);
    } else {
      setPost(null);
    }
  };
  useEffect(() => {
    getPostInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{JSON.stringify(post)}</>;
};
export default PostDetail;
