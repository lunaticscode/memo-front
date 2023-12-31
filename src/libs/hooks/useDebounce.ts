import { useEffect, useRef, useState } from "react";

const useDebounce = (cb: any, delay: number) => {
  // const [debounceValue, setDebounceValue] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const applyDebounce = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    const newTimer = setTimeout(() => {
      cb();
    }, delay);
    timer.current = newTimer;
  };

  //   useEffect(() => {
  //     return () => {
  //       // clearTimeout(handler);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [handleDebounce]);
  return { applyDebounce };
};
export default useDebounce;
