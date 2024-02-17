import AlbumItem from "../components/pages/album/AlbumItem";
import AlbumTitle from "../components/pages/album/AlbumTitle";

const AlbumPage = () => {
  return (
    <div className={"album-page-wrapper"}>
      <AlbumItem>
        <AlbumTitle>2024.02.16</AlbumTitle>
        <img
          src={"/album/kuhee_insoo_0216_3.jpeg"}
          alt="kuhee_insoo_0216_3.jpeg"
        />
        <img
          src={"/album/kuhee_insoo_0216_4.jpeg"}
          alt="kuhee_insoo_0216_4.jpeg"
        />
        <img
          src={"/album/kuhee_insoo_0216_1.jpeg"}
          alt="kuhee_insoo_0216_1.jpeg"
        />
        <img
          src={"/album/kuhee_insoo_0216_2.jpeg"}
          alt="kuhee_insoo_0216_2.jpeg"
        />
        <img
          src={"/album/kuhee_insoo_0216_5.png"}
          alt="kuhee_insoo_0216_5.png"
        />
        <img
          src={"/album/kuhee_insoo_0216_6.jpeg"}
          alt="kuhee_insoo_0216_6.jpeg"
        />
      </AlbumItem>
      <AlbumItem>
        <AlbumTitle>2024.02.13</AlbumTitle>
        <img src={"/album/kuhee_insoo_0213.gif"} alt="kuhee_insoo_0213.gif" />
      </AlbumItem>
    </div>
  );
};
export default AlbumPage;
