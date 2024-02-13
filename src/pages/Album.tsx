import AlbumItem from "../components/pages/album/AlbumItem";
import AlbumTitle from "../components/pages/album/AlbumTitle";

const AlbumPage = () => {
  return (
    <div className={"album-page-wrapper"}>
      <AlbumItem>
        <AlbumTitle>2024.02.13</AlbumTitle>
        <img src={"/album/kuhee_insoo_0213.gif"} alt="kuhee_insoo_0213.gif" />
      </AlbumItem>
    </div>
  );
};
export default AlbumPage;
