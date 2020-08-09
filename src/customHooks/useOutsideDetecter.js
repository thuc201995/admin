import { useEffect } from "react";

const useOutsideDetecter = (refs, callBack) => {
  useEffect(() => {
    const handlerClickOutside = (e) => {
      let isClickOutSide = true;
      if (refs && refs.length > 0) {
        refs.forEach((ref) => {
          if (ref.current && ref.current.contains(e.target)) {
            isClickOutSide = false;
            return;
          }
        });
      }
      if (isClickOutSide) callBack();
    };
    document.addEventListener("click", handlerClickOutside);
    return () => {
      document.removeEventListener("click", handlerClickOutside);
    };
  });
};

export default useOutsideDetecter;
