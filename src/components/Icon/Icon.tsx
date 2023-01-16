import { MouseEvent } from 'react';
import useDisplayIcon from '../../hooks/useDisplayIcon';
import { StyledIconContainer, StyledIcon } from './Icon.styles';

interface IconProps {
  clear: () => void;
  search: (e: MouseEvent<HTMLDivElement>) => void;
  loading: string;
}

const Icon = ({ clear, search, loading }: IconProps) => {
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
