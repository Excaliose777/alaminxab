import { useEffect } from "react";

const useResize = (ref) => {
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        ref.current.style.width = window.innerWidth + "px";
        ref.current.style.height = window.innerHeight + "px";
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);
};

export default useResize;
