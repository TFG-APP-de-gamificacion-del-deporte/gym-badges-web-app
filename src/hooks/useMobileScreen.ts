import { useState, useEffect } from "react";
import GV from "@/public/global_vars.module.scss"

export default function useMobileScreen() {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${GV.mobileWidth})`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener); 

    return () => media.removeEventListener("change", listener);
  }, [matches]);

  return matches;
}