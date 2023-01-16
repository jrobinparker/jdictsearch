import { forwardRef, ReactElement } from 'react';
import Result from '../Result/Result';
import { StyledResultsContainer } from './Results.styles';
import useSetSearchResults from '../../hooks/useSetSearchResults';

interface ResultsProps {
  weblio: string,
  eiNavi: string,
  eijiro: string,
  term: string
}

export type ResultRef = HTMLDivElement | null;

const Results = forwardRef<ResultRef, ResultsProps>(({ weblio, eiNavi, eijiro, term }, ref) => {
  const [results] = useSetSearchResults(weblio, eiNavi, eijiro);

  let weblioComponent: ReactElement | undefined, 
      eiNaviComponent: ReactElement | undefined,
      eijiroComponent: ReactElement | undefined;

  if (results.weblio.length) {
    weblioComponent = (
      <Result
        name="weblio"
        length={results.weblio.length}
        text={results.weblio}
        term={term}
      />
    );
  }

  if (results.eiNavi.length) {
    eiNaviComponent = (
      <Result
        name="ei-navi"
        length={results.eiNavi.length}
        text={results.eiNavi}
        term={term}
      />
    );
  }

  if (results.eijiro.length) {
    eijiroComponent = (
      <Result
        name="eijiro"
        length={results.eijiro.length}
        text={results.eijiro}
        term={term}
      />
    );
  }

  return (
    <StyledResultsContainer ref={ref}>
      {weblioComponent}
      {eiNaviComponent}
      {eijiroComponent}
    </StyledResultsContainer>
  );
});

export default Results;
