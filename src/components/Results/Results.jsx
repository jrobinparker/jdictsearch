import React from 'react';
import Result from '../Result/Result';
import { StyledResultsContainer } from './Results.styles';
import useSetSearchResults from '../../hooks/useSetSearchResults';

const Results = ({ weblio, eiNavi, eijiro, term }, ref) => {
  const [results] = useSetSearchResults(weblio, eiNavi, eijiro);

  let weblioComponent, eiNaviComponent, eijiroComponent;

  if (results.weblio.length) {
    weblioComponent = (
      <Result
        name="weblio"
        url={`https://ejje.weblio.jp/content/${term}`}
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
        url={`https://www.ei-navi.jp/dictionary/content/${term}/`}
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
        url={`https://eow.alc.co.jp/search?q=${term}&ref=sa`}
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
};

export default React.forwardRef(Results);
