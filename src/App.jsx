import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import gsap from 'gsap';
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
  const [failedStatus, setFailedStatus] = useState(false);

  const onTermSubmit = async (searchTerm) => {
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
    resultAnimation(-5, true);
    setTimeout(() => {
      setResults({
        weblio: '',
        eiNavi: '',
        eijiro: '',
      });
      setTerm('');
      setLoading('inactive');
      setFailedStatus(false);
    }, 1000);
  };

  const resultAnimation = (yValue, reload = false) => {
    const result1 = document.querySelectorAll('.result')[0];
    const result2 = document.querySelectorAll('.result')[1];
    const result3 = document.querySelectorAll('.result')[2];
    const tl = gsap.timeline();

    if (reload) {
      const noResults = document.querySelector('.no-results');
      return tl
        .to(result1, 0.25, { opacity: 0, y: yValue })
        .to(result2, 0.25, { opacity: 0, y: yValue })
        .to(result3, 0.25, { opacity: 0, y: yValue })
        .to(noResults, 0.25, { opacity: 0, y: yValue });
    }

    return tl
      .to(result1, 0.25, { delay: 1, opacity: 1, y: yValue })
      .to(result2, 0.25, { delay: 1, opacity: 1, y: yValue })
      .to(result3, 0.25, { delay: 1, opacity: 1, y: yValue });
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
        <Search 
          onTermSubmit={onTermSubmit} 
          handleReload={handleReload} 
          loading={loading} 
        />
        <StyledRow>
          {defaultState && <Fragment />}
          {hasResults && (
            <Fragment>
              <Results
                weblio={results.weblio}
                eiNavi={results.eiNavi}
                eijiro={results.eijiro}
                term={term}
                showResults={resultAnimation}
                loading={loading}
              />
            </Fragment>
          )}
          {failedStatus && <NoResults />}
        </StyledRow>
      </StyledUi>
    </StyledContainer>
  );
};

export default App;
