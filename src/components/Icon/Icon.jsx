import React, { useEffect, useState } from "react";
import { StyledIconContainer, StyledIcon } from "./Icon.styles";

const Icon = ({ clear, search, loading }) => {
  const [displayIcon, setDisplayIcon] = useState("fa-search");

  useEffect(() => {
    if (loading === "inactive") setDisplayIcon("fa-search");
    if (loading === "loading") setDisplayIcon("fa-spinner spin-animation");
    if (loading === "loaded") setDisplayIcon("fa-times");
  }, [loading]);

  return (
    <StyledIconContainer
      onClick={e => loading !== "loaded" ? search(e) : clear()}
    >
      <StyledIcon displayIcon={`${displayIcon}`} />
    </StyledIconContainer>
  );
};

export default Icon;
