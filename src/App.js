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
      loading: false
    }

    onTermSubmit = searchTerm => {
      this.setState({
        term: searchTerm
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

  render () {
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <Search onTermSubmit={this.onTermSubmit} />
        <Results
          weblio={this.state.weblio}
          infoseek={this.state.infoseek}
          eijiro={this.state.eijiro}
          term={this.state.term}
        />
      </div>
    );
  }
}

export default App;
