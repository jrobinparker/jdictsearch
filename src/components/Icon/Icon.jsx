import React from 'react';
import useDisplayIcon from '../../hooks/useDisplayIcon';
import { StyledIconContainer, StyledIcon } from './Icon.styles';

const Icon = ({ clear, search, loading }) => {
  const [displayIcon] = useDisplayIcon(loading);

  return (
    <StyledIconContainer
      onClick={e => loading !== 'loaded' ? search(e) : clear()}
    >
      <StyledIcon displayIcon={`${displayIcon}`} />
    </StyledIconContainer>
  );
};

export default Icon;
