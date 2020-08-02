import { useEffect, useState } from "react";

const useOutsideDetecter = (ref) => {
  const [isClickOutside, setIsClickOutside] = useState(false);

  useEffect(() => {
    const handlerClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClickOutside(true);
      } else {
        setIsClickOutside(false);
      }
    };
    document.addEventListener("click", handlerClickOutside);
    return () => {
      document.removeEventListener("click", handlerClickOutside);
    };
  }, [ref.current]);
  return isClickOutside;
};

export default useOutsideDetecter;
