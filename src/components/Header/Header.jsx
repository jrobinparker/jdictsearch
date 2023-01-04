import React from "react";
import { StyledHeader, StyledHeaderMainText, StyledHeaderSubText } from "./Header.styles";

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeaderMainText>JDictSearch</StyledHeaderMainText>
      <StyledHeaderSubText>
        English-Japanese dictionary search aggregator
      </StyledHeaderSubText>
    </StyledHeader>
  );
};

export default Header;
