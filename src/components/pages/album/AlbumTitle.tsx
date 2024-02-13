import { FC, PropsWithChildren } from "react";
interface AlbumTitleProps extends PropsWithChildren {}
const AlbumTitle: FC<AlbumTitleProps> = ({ children }) => {
  return <div className={"album-title-wrapper"}>{children}</div>;
};
export default AlbumTitle;
