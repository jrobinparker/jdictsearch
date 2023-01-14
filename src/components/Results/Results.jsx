import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Result from '../Result/Result';
import { StyledResultsContainer } from './Results.styles';

const Results = ({ weblio, eiNavi, eijiro, term, cleared }) => {
  const [results, setResults] = useState({
    weblio: [],
    eiNavi: [],
    eijiro: [],
  });
  const [display, setDisplay] = useState(true);
  const rowRef = useRef(null);

  useLayoutEffect(() => {
      if (cleared) {
        rowRef.current.className = `${rowRef.current.className} slide-down`;
        setTimeout(() => setDisplay(false), 500);
      }
  }, [cleared]);


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

  return display &&
    <StyledResultsContainer ref={rowRef}>
      {weblioComponent}
      {eiNaviComponent}
      {eijiroComponent}
    </StyledResultsContainer>
  ;
};

export default Results;
