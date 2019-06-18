import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import Search from './components/Search';
import './App.css';

class App extends React.Component {
  state = {
      weblio: '',
      infoseek: ''
    }

    onTermSubmit = searchTerm => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://ejje.weblio.jp/content/${searchTerm}`)
        .then(res => {
          const $ = cheerio.load(res.data);
          const result1Data = $('.content-explanation.ej').text();
          this.setState({
            weblio: result1Data
          });

        return axios.get(`https://cors-anywhere.herokuapp.com/http://dictionary.infoseek.ne.jp/ejword/${searchTerm}`)
          .then(res => {
              const $ = cheerio.load(res.data);
              const result2Data = $('.word_block').children().slice(2, 11).text();
               this.setState({
                 infoseek: result2Data
               });
               console.log(this.state.infoseek)
          })
        })
  }
  render () {
    return (
      <div className="ui container" style={{ marginTop: '20px' }}>
        <Search onTermSubmit={this.onTermSubmit} />
      </div>
    );
  }
}

export default App;
