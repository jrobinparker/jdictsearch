import React, { useEffect } from "react";
import gsap from "gsap";
import { StyledNoResults } from "./NoResults.styles";

const NoResults = () => {
  useEffect(() => {
    const msg = document.querySelector(".no-results");
    gsap.to(msg, 0.5, { opacity: 1, y: -5 });
  }, []);

  return <StyledNoResults>No results found!</StyledNoResults>;
};

export default NoResults;
