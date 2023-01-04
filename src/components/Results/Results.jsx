import React, { useState, useEffect } from 'react';
import Result from '../Result/Result';
import { StyledResultsContainer } from './Results.styles';

const Results = ({ weblio, eiNavi, eijiro, term, showResults }) => {
  const [results, setResults] = useState({
    weblio: [],
    eiNavi: [],
    eijiro: [],
  });

  useEffect(() => {
    if (weblio.length) {
      setResults({
        ...results,
        weblio: [...weblio.split('主な意味').toString().split('、')],
      });
    }

    if (eiNavi.length) {
      setResults({
        ...results,
        eiNavi: [...eiNavi.split('、')],
      });
    }

    if (eijiro.length) {
      setResults({
        ...results,
        eijiro: [...eijiro.split('<a')[0].split('【レベル】')[0].split('、')],
      });
    }
  }, [weblio, eiNavi, eijiro]);

  let weblioComponent, eiNaviComponent, eijiroComponent;

  if (results.weblio.length) {
    weblioComponent = (
      <Result
        name="weblio"
        url={`https://ejje.weblio.jp/content/${term}`}
        length={results.weblio.length}
        text={results.weblio}
        term={term}
        appear={showResults}
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
        appear={showResults}
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
        appear={showResults}
      />
    );
  }

  return (
    <StyledResultsContainer>
      {weblioComponent}
      {eiNaviComponent}
      {eijiroComponent}
    </StyledResultsContainer>
  );
};

export default Results;
