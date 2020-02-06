import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import gsap from 'gsap';
import Search from './components/Search';
import Results from './components/Results';
import Arrow from './components/Arrow';
import './App.css';

class App extends React.Component {
  state = {
      weblio: '',
      infoseek: '',
      eijiro: '',
      term: '',
      renderChild: false
    }

    onTermSubmit = searchTerm => {
      this.setState({
        term: searchTerm,
        renderChild: true
      })

      axios.get(`https://cors-anywhere.herokuapp.com/https://ejje.weblio.jp/content/${searchTerm}`)
        .then(res => {
          const $ = cheerio.load(res.data);
          const result1Data = $('.content-explanation.ej').text();
          this.setState({
            weblio: result1Data,
            loading: false
          });

        return axios.get(`https://cors-anywhere.herokuapp.com/http://dictionary.infoseek.ne.jp/ejword/${searchTerm}`)
          .then(res => {
              const $ = cheerio.load(res.data);
              const result2Data = $('.word_block').children().slice(2, 11).text();
               this.setState({
                 infoseek: result2Data
               })

         return axios.get(`https://cors-anywhere.herokuapp.com/https://eow.alc.co.jp/search?q=${searchTerm}&ref=sa`)
           .then(res => {
             const $ = cheerio.load(res.data);
             const result3Data = $('ul li div ul li, #resultsList').children().slice(2, 4).text();
             this.setState({
               eijiro: result3Data
             });
           })
          })
        })
  }

  handleReload = () => {

    const result1 = document.querySelectorAll('.result')[0]
    const result2 = document.querySelectorAll('.result')[1]
    const result3 = document.querySelectorAll('.result')[2]
    const tl = gsap.timeline()

    tl.to(result1, .25, {opacity: 0, y: 5})
      .to(result2, .25, {opacity: 0, y: 5})
      .to(result3, .25, {opacity: 0, y: 5})

    setTimeout(() => {
      this.setState({
        weblio: '',
        infoseek: '',
        eijiro: '',
        term: '',
        renderChild: !this.state.renderChild
      })}, 1000)
  }

  resultAnimation = () => {
    const result1 = document.querySelectorAll('.result')
    const linkButtons = document.querySelectorAll('.view-link')
    gsap.to(result1, .5, {opacity: 1, y: -5})
  }

  render () {

    return (
      <div className="container">
        <div className="header">
          <div className="header-text">
            <div className="header-maintext">JDictSearch</div>
            <div className="header-subtext">english-japanese dictionary search aggregator</div>
          </div>
        </div>
        <div className="row">
          <Search
            onTermSubmit={this.onTermSubmit}
            handleReload={this.handleReload}
          />
          <Arrow />
            {this.state.renderChild ? (
                <Results
                  weblio={this.state.weblio}
                  infoseek={this.state.infoseek}
                  eijiro={this.state.eijiro}
                  term={this.state.term}
                  showResults={this.resultAnimation}
                />
            ) : (
                <React.Fragment></React.Fragment>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
