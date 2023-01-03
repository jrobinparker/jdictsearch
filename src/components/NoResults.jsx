import React, { useEffect } from "react";
import gsap from "gsap";

const NoResults = () => {
  useEffect(() => {
    const msg = document.querySelector(".no-results");
    gsap.to(msg, 0.5, { opacity: 1, y: -5 });
  }, []);

  return <div className="no-results">No results found!</div>;
};

export default NoResults;
