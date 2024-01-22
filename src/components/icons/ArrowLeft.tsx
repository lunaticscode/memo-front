import { ChangeEvent, FC, useState } from "react";
import axios from "axios";
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
const getApi = async (path: string, params: any) => {
  return await axios.get(path, { params });
};
const postApi = async (path: string, data: any) => {
  return await axios.post(path, data);
};

type ApiMethods = "get" | "post";
type ApiParams = [string, any];
type APiFetcher = (...args: ApiParams) => Promise<any>;
const mapMethodToFetcher: {
  [key in ApiMethods]: APiFetcher;
} = {
  get: (...args: ApiParams) => getApi(...args),
  post: (...args: ApiParams) => postApi(...args),
};
console.log(mapMethodToFetcher);
// type ApiFetcherType = { [key in ApiMethods]: (params: ApiParms) => void };
// const apiFetcher: ApiFetcherType = {
//   get: (...args: ApiParms) => {},
//   post: () => {},
//   delete: () => {},
//   patch: () => {},
//   put: () => {},
// };
