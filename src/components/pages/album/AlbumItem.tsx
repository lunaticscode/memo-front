import { FC, PropsWithChildren } from "react";

interface AlbumItemProps extends PropsWithChildren {}
const AlbumItem: FC<AlbumItemProps> = ({ children }) => {
  return <article className={"album-item-wrapper"}>{children}</article>;
};
export default AlbumItem;
