import {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useMemo,
} from "react";
import AlbumTitle from "./AlbumTitle";

interface AlbumItemProps extends PropsWithChildren {}
const AlbumItem: FC<AlbumItemProps> = ({ children }) => {
  const _children = Children.toArray(children) as ReactElement[];
  const albumTitleElem = useMemo(
    () => _children.find((child) => child.type === AlbumTitle),
    [_children]
  );
  const albumImageElems = useMemo(
    () => _children.filter((child) => child.type !== AlbumTitle),
    [_children]
  );
  const albumImageCount = albumImageElems.length ?? 0;
  return (
    <article className={"album-item-wrapper"}>
      {albumImageCount === 1 && children}
      {albumImageCount > 1 && (
        <>
          <div style={{ display: "block" }}>{albumTitleElem}</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginTop: "25px",
            }}
          >
            {albumImageElems.map((albumImage, index) =>
              cloneElement(albumImage, {
                ...albumImage.props,
                key: `album-image-elem-${index}`,
                style: { width: "160px", height: "230px", margin: "2.5px" },
              })
            )}
          </div>
        </>
      )}
    </article>
  );
};
export default AlbumItem;
