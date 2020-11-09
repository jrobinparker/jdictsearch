import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import gsap from 'gsap';
import Search from './components/Search';
import Results from './components/Results';
import NoResults from './components/NoResults';
import './App.css';

const App = () => {
  const [weblio, setWeblio] = useState('')
  const [infoSeek, setInfoSeek] = useState('')
  const [eijiro, setEijiro] = useState('')
  const [term, setTerm] = useState('')
  const [renderStatus, setRenderStatus] = useState(false)
  const [failedStatus, setFailedStatus] = useState(false)


  const onTermSubmit = searchTerm => {
      setTerm(searchTerm)
      weblioSearch(searchTerm)
      infoseekSearch(searchTerm)
      eijiroSearch(searchTerm)
  }

  const weblioSearch = (searchTerm) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://ejje.weblio.jp/content/${searchTerm}`)
      .then(res => {
        const $ = cheerio.load(res.data);
        const result1Data = $('.content-explanation.ej').text();
        setWeblio(result1Data)
        setRenderStatus(true)
      })
      .catch(err => {
        setFailedStatus(true)
        setRenderStatus(true)
      })
    }

  const infoseekSearch = (searchTerm) => {
    axios.get(`https://cors-anywhere.herokuapp.com/http://dictionary.infoseek.ne.jp/ejword/${searchTerm}`)
      .then(res => {
          const $ = cheerio.load(res.data);
          const result2Data = $('.word_block').children().slice(2, 11).text();
           setInfoSeek(result2Data)
           setRenderStatus(true)
         })
         .catch(err => {
           setFailedStatus(true)
           setRenderStatus(true)
         })
  }

  const eijiroSearch = (searchTerm) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://eow.alc.co.jp/search?q=${searchTerm}&ref=sa`)
      .then(res => {
        const $ = cheerio.load(res.data);
        const result3Data = $('ul li div ul li, #resultsList').children().slice(2, 4).text();
        setEijiro(result3Data)
        setRenderStatus(true)
      })
   .catch(err => {
     setFailedStatus(true)
     setRenderStatus(true)
   })
  }

  const handleReload = () => {

    const result1 = document.querySelectorAll('.result')[0]
    const result2 = document.querySelectorAll('.result')[1]
    const result3 = document.querySelectorAll('.result')[2]
    const noResults = document.querySelector('.no-results')
    const uiElements = document.querySelector('.ui-contents')
    const input = document.getElementsByTagName('form')
    const tl = gsap.timeline()

    if (window.matchMedia("(orientation: portrait)").matches) {
      tl.to(result1, .25, {opacity: 0, x: -5})
        .to(result2, .25, {opacity: 0, x: -5})
        .to(result3, .25, {opacity: 0, x: -5})
        .to(noResults, .25, {opacity: 0, x: -5})
        .to(input, .25, {y: 0})
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      tl.to(result1, .25, {opacity: 0, x: -5})
        .to(result2, .25, {opacity: 0, x: -5})
        .to(result3, .25, {opacity: 0, x: -5})
        .to(noResults, .25, {opacity: 0, x: -5})
        .to(uiElements, .25, {y: 0})
    }

    setTimeout(() => {
      setWeblio('')
      setInfoSeek('')
      setEijiro('')
      setTerm('')
      setRenderStatus(!renderStatus)
      setFailedStatus(false)
      }, 1000)
  }

  const resultAnimation = () => {
    const result1 = document.querySelectorAll('.result')[0]
    const result2 = document.querySelectorAll('.result')[1]
    const result3 = document.querySelectorAll('.result')[2]
    const uiElements = document.querySelector('.ui-contents')
    const input = document.getElementsByTagName('form')
    const tl = gsap.timeline()

    if (window.matchMedia("(orientation: portrait)").matches) {
      tl.to(input, .25, {y: -100})
        .to(result1, .25, {delay: 1, opacity: 1, x: 5})
        .to(result2, .25, {delay: 1, opacity: 1, x: 5})
        .to(result3, .25, {delay: 1, opacity: 1, x: 5})
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      tl.to(uiElements, .25, {y: -100})
        .to(result1, .25, {delay: 1, opacity: 1, x: 5})
        .to(result2, .25, {delay: 1, opacity: 1, x: 5})
        .to(result3, .25, {delay: 1, opacity: 1, x: 5})
    }

  }

  useEffect(() => {
    const result1 = document.querySelectorAll('.result')[0]
    const result2 = document.querySelectorAll('.result')[1]
    const result3 = document.querySelectorAll('.result')[2]
    const uiElements = document.querySelector('.ui-contents')
    const input = document.getElementsByTagName('form')
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 765) {
        gsap.to(input, .25, { y: -100 })
      }

      if (window.innerWidth >= 766) {
        gsap.to(input, .25, { y: 0 })
      }
    })
  }, [])

  let image = require('./assets/splash2.png')

    return (
      <div className="container">
        <div className="image">
          <img src={`${image}`} alt='splash' className="person" />
        </div>
        <div className="ui">
          <div className="ui-contents">
            <div className="header">
              <div className="header-text">
                <div className="header-maintext">JDictSearch</div>
                <div className="header-subtext">english-japanese dictionary search aggregator</div>
              </div>
            </div>
            <div className="row">
              <Search
                onTermSubmit={onTermSubmit}
                handleReload={handleReload}
              />
                {renderStatus && !failedStatus ? (
                  <Fragment>
                      <Results
                        weblio={weblio}
                        infoseek={infoSeek}
                        eijiro={eijiro}
                        term={term}
                        showResults={resultAnimation}
                      />
                    </Fragment>
                ) : renderStatus && failedStatus ? (
                  <NoResults />
                ) : (
                    <Fragment></Fragment>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
