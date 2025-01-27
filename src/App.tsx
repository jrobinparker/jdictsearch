import { useRef, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import Search from "../src/components/Search/Search";
import Results from "../src/components/Results/Results";
import NoResults from "../src/components/NoResults/NoResults";
import Background from "../src/components/Background/Background";
import Header from "../src/components/Header/Header";
import { StyledContainer, StyledRow, StyledUi } from "./App.styles";
import { GlobalStyles } from "./GlobalStyle.styles";

import "./App.css";

const BASE_URL = "https://pure-coast-05369.herokuapp.com/";

const App = () => {
  const [results, setResults] = useState<Record<string, string[]>>({
    weblio: [],
    eiNavi: [],
    eijiro: [],
  });
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<string>("inactive");
  const [failedStatus, setFailedStatus] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const onTermSubmit = async (searchTerm: string): Promise<void> => {
    if (!searchTerm.length) {
      setFailedStatus(true);
      return;
    }

    setLoading("loading");
    setTerm(searchTerm);

    const isEnglishTerm = !!searchTerm.match(/\w/g)?.length;

    await weblioSearch(searchTerm, isEnglishTerm);
    await eiNaviSearch(searchTerm, isEnglishTerm);
    await eijiroSearch(searchTerm, isEnglishTerm);
    setLoading("loaded");
  };

  const weblioSearch = async (searchTerm: string, isEnglishTerm: boolean): Promise<void> => {
    try {
      const req = axios.get(
        `${BASE_URL}https://ejje.weblio.jp/content/${searchTerm}`
      );
      const res = await req;
      const $ = cheerio.load(res.data);
      const weblioData = isEnglishTerm ? $(".content-explanation.ej").text() : $(".content-explanation.je").text();
      const data = isEnglishTerm ? weblioData.split('主な意味').toString().trim().split('、') : weblioData.trim().split('; ');
      if (data.length) setResults({ ...results, weblio: data });
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const eiNaviSearch = async (searchTerm: string, isEnglishTerm: boolean): Promise<void> => {
    try {
      const eiNaviUrl = isEnglishTerm
        ? `https://www.ei-navi.jp/dictionary/content/${searchTerm}/`
        : `https://www.ei-navi.jp/dictionary/ja_en/${searchTerm}/`;
      const req = axios.get(`${BASE_URL}${eiNaviUrl}`);
      const res = await req;
      const $ = cheerio.load(res.data);

      const data = $.extract({
        text: [isEnglishTerm ? ".main .container .summary .list-group .list-group-item .list-group-item-text" : "dl:last"]
      })

      if (data.text?.length) setResults({ ...results, eiNavi: data.text });
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const eijiroSearch = async (searchTerm: string, isEnglishTerm: boolean): Promise<void> => {
    try {
      const req = axios.get(
        `${BASE_URL}https://eow.alc.co.jp/search?q=${searchTerm}`
      );
      const res = await req;
      const $ = cheerio.load(res.data);
      const data = $.extract({
        text: [isEnglishTerm ? ".search-use-list ul .result-item div ol li" : ".ul_je:first li"]
      });
      
      if (data.text?.length) setResults({ ...results, eijiro: data.text });
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const handleReload = (): void => {
    if (resultsRef.current)
      resultsRef.current.className = `${resultsRef.current.className} slide-down`;
    setTimeout(() => {
      setResults({
        weblio: [],
        eiNavi: [],
        eijiro: [],
      });
      setTerm("");
      setLoading("inactive");
      setFailedStatus(false);
    }, 500);
  };

  const defaultState =
    !results.weblio.length &&
    !results.eiNavi.length &&
    !results.eijiro.length &&
    !failedStatus;
  const hasResults =
    !!(results.weblio.length ||
      results.eiNavi.length ||
      results.eijiro.length ) &&
    !failedStatus;

  return (
    <StyledContainer>
      <GlobalStyles />
      <Background />
      <StyledUi>
        <Header />
        <Search
          onTermSubmit={onTermSubmit}
          handleReload={handleReload}
          loading={loading}
        />
        <StyledRow>
          {defaultState && <></>}
          {failedStatus && <NoResults />}
          {hasResults && (
            <Results
              weblio={results.weblio}
              eiNavi={results.eiNavi}
              eijiro={results.eijiro}
              term={term}
              isEngTerm={!!term.match(/\w/g)?.length}
              ref={resultsRef}
            />
          )}
        </StyledRow>
      </StyledUi>
    </StyledContainer>
  );
};

export default App;
