import useBgImages from '../../hooks/useBgImages';
import { StyledBackground } from './Background.styles';

export default function Background() {
  useBgImages();

  return <StyledBackground className="bg" />;
}
