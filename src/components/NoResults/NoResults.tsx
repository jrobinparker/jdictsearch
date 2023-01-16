import React, { MutableRefObject, useEffect, useRef } from 'react';
import { StyledNoResults } from './NoResults.styles';

const NoResults = () => {
  const noResultRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (noResultRef.current) noResultRef.current.className = `${noResultRef.current.className} slide-top`;
  }, [noResultRef]);


  return <StyledNoResults ref={noResultRef}>No results found!</StyledNoResults>;
};

export default NoResults;
