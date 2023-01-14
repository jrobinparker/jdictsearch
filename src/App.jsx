import React, { useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Search from '/src/components/Search/Search';
import Results from '/src/components/Results/Results';
import NoResults from '/src/components/NoResults/NoResults';
import Background from '/src/components/Background/Background';
import Header from '/src/components/Header/Header';
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
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState('inactive');
  const [cleared, setCleared] = useState(false);
  const [failedStatus, setFailedStatus] = useState(false);

  const onTermSubmit = async (searchTerm) => {
    if (!searchTerm.length) {
      setFailedStatus(true);
      return;
    }
    
    setCleared(false);
    setLoading('loading');
    setTerm(searchTerm);
    await weblioSearch(searchTerm);
    await eiNaviSearch(searchTerm);
    await eijiroSearch(searchTerm);
    setLoading('loaded');
  };

  const weblioSearch = async (searchTerm) => {
    try {
      const req = axios.get(`${BASE_URL}https://ejje.weblio.jp/content/${searchTerm}`);
      const res = await req;
      const $ = cheerio.load(res.data);
      const result1Data = $('.content-explanation.ej').text();
      setResults({ ...results, weblio: result1Data });
    } catch (error) {
      console.log(error);
      setFailedStatus(true);
    }
  };

  const eiNaviSearch = async (searchTerm) => {
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

  const eijiroSearch = async (searchTerm) => {
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

  const handleReload = () => {
    setCleared(true);
    setTerm('');
    setLoading('inactive');
    setFailedStatus(false);
    setTimeout(() => {
      if (cleared) {
        setResults({
          weblio: '',
          eiNavi: '',
          eijiro: '',
        });
      }
    }, 500)
  };

  const defaultState = !results.weblio.length && !results.eiNavi.length && !results.eijiro.length && !failedStatus;

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
          <Results
            weblio={results.weblio}
            eiNavi={results.eiNavi}
            eijiro={results.eijiro}
            term={term}
            cleared={cleared}
            loading={loading}
          />
        </StyledRow>
      </StyledUi>
    </StyledContainer>
  );
};

export default App;
