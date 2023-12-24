import { ChangeEvent, FC, useState } from "react";
import { IconProps } from "../../customTypes";

interface ArrowLeftProps extends IconProps {}

const ArrowLeft: FC<ArrowLeftProps> = ({ active, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      //   dataSlot="icon"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
      />
    </svg>
  );
};
export default ArrowLeft;
