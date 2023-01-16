import useDisplayIcon from '../../hooks/useDisplayIcon';
import { StyledIconContainer, StyledIcon } from './Icon.styles';

interface IconProps {
  clear: Function;
  search: Function;
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
