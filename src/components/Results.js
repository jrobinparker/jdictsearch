import React from 'react';
import Result from './Result';
import Loader from './Loader';

class Results extends React.Component {
  state = {
    weblioResult: [],
    infoseekResult: [],
    eijiroResult: [],
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.weblioResult.length === 0 || this.state.infoseekResult.length === 0 || this.state.eijiroResult.length === 0) {
      this.setState({
        loading: true
      })
    }
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

    if (this.state.weblioResult.length >= 1 || this.state.infoseekResult.length >= 1 || this.state.eijiroResult.length >= 1) {
      this.setState({
        loading: false
      })
    }
  }

  render() {

    let weblioComponent, infoseekComponent, eijiroComponent, loading

    const { term } = this.props

    if (this.state.loading) {
      loading = <Loader />
    }

    if (this.state.weblioResult.length >= 1) {
      weblioComponent = <Result name="weblio" url={`https://ejje.weblio.jp/content/${term}`} text={this.state.weblioResult} buttonId="1" />
    }

    if (this.state.infoseekResult.length >= 1) {
      infoseekComponent = <Result name="infoseek" url={`http://dictionary.infoseek.ne.jp/ejword/${term}`} text={this.state.infoseekResult} buttonId="2" />
    }

    if (this.state.eijiroResult.length >= 1) {
      eijiroComponent = <Result name="eijiro" url={`https://eow.alc.co.jp/search?q=${term}&ref=sa`} text={this.state.eijiroResult} buttonId="3" />
    }

    return (

    <div className="results-grid">
        {loading}
        {weblioComponent}
        {infoseekComponent}
        {eijiroComponent}
    </div>
    );
  }
}

export default Results;
