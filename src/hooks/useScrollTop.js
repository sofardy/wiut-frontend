import { useEffect, useState } from "react";

function useScrollTop() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    });
  }, []);

  return scrollPosition

}
export default useScrollTop;