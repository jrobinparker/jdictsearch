import React, { useEffect, useRef } from 'react';
import { StyledNoResults } from './NoResults.styles';

const NoResults = () => {
  const noResultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (noResultRef.current) noResultRef.current.className = `${noResultRef.current.className} slide-top`;
  }, [noResultRef]);

  return <StyledNoResults ref={noResultRef}>No results found!</StyledNoResults>;
};

export default NoResults;
