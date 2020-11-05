import React, { Fragment, useState } from 'react';
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
  const [renderStatus, setRenderStatus] = useState('results')
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
      })
      .catch(err => {
        this.setState({
          failed: true,
          renderChild: true
        })
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
    const tl = gsap.timeline()

    tl.to(result1, .25, {opacity: 0, x: -5})
      .to(result2, .25, {opacity: 0, x: -5})
      .to(result3, .25, {opacity: 0, x: -5})
      .to(noResults, .25, {opacity: 0, x: -5})

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
    const tl = gsap.timeline()

    tl.to(result1, .25, {delay: 1, opacity: 1, x: 5})
      .to(result2, .25, {delay: 1, opacity: 1, x: 5})
      .to(result3, .25, {delay: 1, opacity: 1, x: 5})
  }

  let image = require('./assets/splash2.png')

    return (
      <div className="container">
        <div className="image">
          <img src={`${image}`} alt='splash' className="person" />
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path fill="#A7F0BA" d="M38.3,-56.7C52.7,-50.3,69.5,-44.9,77.1,-33.6C84.6,-22.4,83,-5.3,79.6,10.8C76.3,26.9,71.2,42.1,60.8,50.9C50.4,59.8,34.7,62.4,19.1,68.6C3.5,74.8,-12.1,84.7,-23.9,81.3C-35.7,77.9,-43.7,61.4,-52.8,47.6C-62,33.8,-72.3,22.8,-76.3,9.6C-80.2,-3.6,-77.8,-19,-70.3,-30.8C-62.9,-42.6,-50.4,-50.8,-37.8,-58C-25.3,-65.2,-12.6,-71.3,-0.3,-70.8C12,-70.3,23.9,-63,38.3,-56.7Z" transform="translate(100 100)" />
          </svg>
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
                {renderStatus === true && failedStatus === false ? (
                  <Fragment>
                      <Results
                        weblio={weblio}
                        infoseek={infoSeek}
                        eijiro={eijiro}
                        term={term}
                        showResults={resultAnimation}
                      />
                    </Fragment>
                ) : renderStatus === true && renderStatus === true ? (
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
