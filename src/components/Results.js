import React from 'react';
import Result from './Result';
import Loader from './Loader';
import gsap from 'gsap';

class Results extends React.Component {
  state = {
    weblioResult: [],
    infoseekResult: [],
    eijiroResult: [],
    loading: 'idle'
  }

  componentDidMount() {
    console.log('results grid mounted')
  }

  componentWillUnmount() {
    console.log('results grid unmounted')
  }

  componentWillReceiveProps(nextProps) {

    // weblio search results
    if (nextProps.weblio) {
      const weblioSearch = nextProps.weblio.split("主な意味").toString().split("、");
      this.setState({
        weblioResult: weblioSearch
      })
    }

    // infoseek search results
    if (nextProps.infoseek) {
      const infoseekSearchFullArray = nextProps.infoseek.split("今日のキーワード")
      const infoseekArray = infoseekSearchFullArray[0].split("；")
      this.setState({
        infoseekResult: infoseekArray
      })
    }

    // eijiro results
    if (nextProps.eijiro) {
      const eijiroSearchFullArray = nextProps.eijiro.split("<a")
      const eijiroSplitArray = eijiroSearchFullArray[0].split("【レベル】")
      const eijiroSplitArray2 = eijiroSplitArray[0].split("、")
      this.setState({
        eijiroResult: eijiroSplitArray2
      })
    }

    if (this.state.weblioResult && this.state.infoseekResult && this.state.eijiroResult) {
      this.setState({
        loading: 'loaded'
      })
    }

  }

  render() {

    let weblioComponent, infoseekComponent, eijiroComponent, loading

    const { term } = this.props

    if (this.state.loaded === 'loaded') {
      weblioComponent = <Result name="weblio" url={`https://ejje.weblio.jp/content/${term}`} text={this.state.weblioResult} buttonId="1" columnName="weblio" key={Math.random()} />

      infoseekComponent = <Result name="infoseek" url={`http://dictionary.infoseek.ne.jp/ejword/${term}`} text={this.state.infoseekResult} buttonId="2" columnName="infoseek" key={Math.random()}/>

      eijiroComponent = <Result name="eijiro" url={`https://eow.alc.co.jp/search?q=${term}&ref=sa`} text={this.state.eijiroResult} buttonId="3" columnName="eijiro" key={Math.random()}/>
    }

    return (

    <div className="results-grid" key={Math.random()} id="results-grid">
        {loading}
        {weblioComponent}
        {infoseekComponent}
        {eijiroComponent}
    </div>
    );
  }
}

export default Results;
