import React, { useState, useEffect } from 'react';
import Result from './Result';

const Results = ({ weblio, eiNavi, eijiro, term, showResults, loading }) => {
  const [weblioResult, setWeblioResult] = useState([]);
  const [eiNaviResult, setInfoSeekResult] = useState([]);
  const [eijiroResult, setEijiroResult] = useState([]);

  useEffect(() => {

    if (weblio) {
      const weblioSearch = weblio.split("主な意味").toString().split("、");
      setWeblioResult(weblioSearch)
    }

    if (eiNavi) {
      const eiNaviArray = eiNavi.split("、")
      setInfoSeekResult(eiNaviArray)
    }

    if (eijiro) {
      const eijiroSearchFullArray = eijiro.split("<a")
      const eijiroSplitArray = eijiroSearchFullArray[0].split("【レベル】")
      const eijiroSplitArray2 = eijiroSplitArray[0].split("、")
      setEijiroResult(eijiroSplitArray2)
    }

  }, [weblio, eiNavi, eijiro])

  let weblioComponent, eiNaviComponent, eijiroComponent

  if (weblioResult.length >= 1) {
    weblioComponent =
      <Result
        name="weblio"
        url={`https://ejje.weblio.jp/content/${term}`}
        length={weblioResult.length}
        text={weblioResult}
        term={term}
        appear={showResults}
      />
  }

  if (eiNaviResult.length >= 1) {
    eiNaviComponent =
      <Result
        name="ei-navi"
        url={`https://www.ei-navi.jp/dictionary/content/${term}/`}
        length={eiNaviResult.length}
        text={eiNaviResult}
        term={term}
        appear={showResults}
      />
  }

  if (eijiroResult.length >= 1) {
    eijiroComponent =
      <Result
        name="eijiro"
        url={`https://eow.alc.co.jp/search?q=${term}&ref=sa`}
        length={eijiroResult.length}
        text={eijiroResult}
        term={term}
        appear={showResults}
      />
  }

    return (
      <div className="results">
        {weblioComponent}
        {eiNaviComponent}
        {eijiroComponent}
      </div>
    )
}

export default Results;
