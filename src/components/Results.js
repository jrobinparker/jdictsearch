import React, { useState, useEffect } from 'react';
import Result from './Result';
import gsap from 'gsap';

const Results = ({ weblio, infoseek, eijiro, term, showResults }) => {
  const [weblioResult, setWeblioResult] = useState([]);
  const [infoSeekResult, setInfoSeekResult] = useState([]);
  const [eijiroResult, setEijiroResult] = useState([]);

  useEffect(() => {
    if (weblio) {
      const weblioSearch = weblio.split("主な意味").toString().split("、");
      setWeblioResult(weblioSearch)
    }

    if (infoseek) {
      const infoSeekSearchFullArray = infoseek.split("今日のキーワード")
      const infoSeekArray = infoSeekSearchFullArray[0].split("；")
      setInfoSeekResult(infoSeekArray)
    }

    if (eijiro) {
      const eijiroSearchFullArray = eijiro.split("<a")
      const eijiroSplitArray = eijiroSearchFullArray[0].split("【レベル】")
      const eijiroSplitArray2 = eijiroSplitArray[0].split("、")
      setEijiroResult(eijiroSplitArray2)
    }
  }, [weblio, infoseek, eijiro])

  let weblioComponent, infoSeekComponent, eijiroComponent

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

  if (infoSeekResult.length >= 1) {
    infoSeekComponent =
      <Result
        name="infoseek"
        url={`http://dictionary.infoseek.ne.jp/ejword/${term}`}
        length={infoSeekResult.length}
        text={infoSeekResult}
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
          {infoSeekComponent}
          {eijiroComponent}
      </div>
    )
}

export default Results;
