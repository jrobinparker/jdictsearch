import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Search from './components/Search';
import Results from './components/Results';
import './App.css';

class App extends React.Component {
  state = {
      weblio: '',
      infoseek: '',
      eijiro: '',
      term: '',
      renderResults: false,
    }

    onTermSubmit = searchTerm => {
      this.setState({
        term: searchTerm,
        renderResults: true
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
    this.setState({
      weblio: '',
      infoseek: '',
      eijiro: '',
      term: '',
      renderResults: false
    })
  }

  render () {
    return (
      <div className="container">
        <div className="title">
          <h2>JDictSearch</h2>
          <h4>the english-japanese search aggregator</h4>
        </div>
        <div className="row">
          <Search onTermSubmit={this.onTermSubmit} removeResults={this.handleReload} />
          {this.state.renderResults ? (
            <Results
              weblio={this.state.weblio}
              infoseek={this.state.infoseek}
              eijiro={this.state.eijiro}
              term={this.state.term}
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
