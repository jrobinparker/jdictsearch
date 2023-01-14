import React, { useEffect, useRef } from 'react';
import { StyledNoResults } from './NoResults.styles';

const NoResults = () => {
  const noResultRef = useRef(null);

  useEffect(() => {
    noResultRef.current.className = `${noResultRef.current.className} slide-top`;
  }, [noResultRef]);


  return <StyledNoResults ref={noResultRef}>No results found!</StyledNoResults>;
};

export default NoResults;
