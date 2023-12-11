import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (cb: () => void, deps: any) => {
  const [targetRef, setTargetRef] = useState<RefObject<HTMLElement>>({
    current: null,
  });

  const callback: IntersectionObserverCallback = (entries) => {
    if (entries[0].isIntersecting) {
      cb();
    }
  };

  const observer = new IntersectionObserver(callback);

  const observe = () => {
    if (targetRef && targetRef.current) {
      observer.observe(targetRef.current);
    }
  };

  useEffect(() => {
    if (targetRef && targetRef.current) {
      observe();
    }
    return () => {
      observer.disconnect();
    };
  }, [targetRef, deps]);

  return {
    setTargetRef,
    observe,
  };
};

export default useIntersectionObserver;
