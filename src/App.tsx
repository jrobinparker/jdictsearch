import { useRef, useState, MutableRefObject } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Search from '../src/components/Search/Search';
import Results from '../src/components/Results/Results';
import NoResults from '../src/components/NoResults/NoResults';
import Background from '../src/components/Background/Background';
import Header from '../src/components/Header/Header';
import { StyledContainer, StyledRow, StyledUi } from './App.styles';
import { GlobalStyles } from './GlobalStyle.styles';

import './App.css';

const BASE_URL = 'https://pure-coast-05369.herokuapp.com/';

const App = () => {
  const [results, setResults] = useState({
    weblio: '',
    eiNavi: '',
    eijiro: '',
  });
  const [term, setTerm] = useState<string>('');
  const [loading, setLoading] = useState<string>('inactive');
  const [failedStatus, setFailedStatus] = useState<boolean>(false);
  const resultsRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const onTermSubmit = async (searchTerm: string): Promise<void> => {
    if (!searchTerm.length) {
      setFailedStatus(true);
      return;
    }

    setLoading('loading');
    setTerm(searchTerm);
    await weblioSearch(searchTerm);
    await eiNaviSearch(searchTerm);
    await eijiroSearch(searchTerm);
    setLoading('loaded');
  };

  const weblioSearch = async (searchTerm: string): Promise<void> => {
    try {
      const req = axios.get(`${BASE_URL}https://ejje.weblio.jp/content/${searchTerm}`);
      const res = await req;
      const $ = cheerio.load(res.data);
      const result1Data = $('.content-explanation.ej').text();
      setResults({ ...results, weblio: result1Data });
    } catch (error) {
      console.error(error);
      setFailedStatus(true);
    }
  };

  const eiNaviSearch = async (searchTerm: string): Promise<void> => {
    try {
      const req = axios.get(`${BASE_URL}https://www.ei-navi.jp/dictionary/content/${searchTerm}/`);
      const res = await req;
      const $ = cheerio.load(res.data);
      const result2Data = $('.main .container .summary .list-group .list-group-item .list-group-item-text')
        .children()
        .text();
      setResults({ ...results, eiNavi: result2Data });
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const eijiroSearch = async (searchTerm: string): Promise<void> => {
    try {
      const req = axios.get(`${BASE_URL}https://eow.alc.co.jp/search?q=${searchTerm}&ref=sa`);
      const res = await req;
      const $ = cheerio.load(res.data);
      const result3Data = $('ul li div ul li, #resultsList').children().slice(2, 4).text();
      setResults({ ...results, eijiro: result3Data });
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const handleReload = (): void => {
    if (resultsRef.current) resultsRef.current.className = `${resultsRef.current.className} slide-down`;
    setTimeout(() => {
      setResults({
        weblio: '',
        eiNavi: '',
        eijiro: '',
      });
      setTerm('');
      setLoading('inactive');
      setFailedStatus(false);
    }, 500);
  };

  const defaultState = !results.weblio.length && !results.eiNavi.length && !results.eijiro.length && !failedStatus;
  const hasResults =
    (results.weblio.length > 1 || results.eiNavi.length > 1 || results.eijiro.length > 1) && !failedStatus;

  return (
    <StyledContainer>
      <GlobalStyles />
      <Background />
      <StyledUi>
        <Header />
        <Search onTermSubmit={onTermSubmit} handleReload={handleReload} loading={loading} />
        <StyledRow>
          {defaultState && <></>}
          {failedStatus && <NoResults />}
          {hasResults && (
            <Results
              weblio={results.weblio}
              eiNavi={results.eiNavi}
              eijiro={results.eijiro}
              term={term}
              ref={resultsRef}
            />
          )}
        </StyledRow>
      </StyledUi>
    </StyledContainer>
  );
};

export default App;
