import { useLayoutEffect, useState } from "react";

const useOutsideDetecter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useLayoutEffect(() => {
    const handlerResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handlerResize);
    return () => window.removeEventListener("resize", handlerResize);
  }, []);
  return isMobile;
};

export default useOutsideDetecter;
