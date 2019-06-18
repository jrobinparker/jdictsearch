import React from 'react';
import Result from './Result';

class Results extends React.Component {
  state = {
    weblioResult: [],
    infoseekResult: [],
    eijiroResult: []
  }

  componentWillReceiveProps(nextProps) {

    // weblio search results
    if (nextProps.weblio) {
      const weblioSearchFullArray = nextProps.weblio.split("主な意味");
      const weblioToStringArray = weblioSearchFullArray.toString();
      const weblioArray = weblioToStringArray.split("、");
      this.setState({
        weblioResult: weblioArray
      })
    }

    // infoseek search results
    if (nextProps.infoseek) {
      const infoseekSearchFullArray = nextProps.infoseek.split("今日のキーワード")
      const infoseekSplitArray = infoseekSearchFullArray[0]
      const infoseekArray = infoseekSplitArray.split("；")
      this.setState({
        infoseekResult: infoseekArray
      })
    }

    // eijiro results
    if (nextProps.eijiro) {
      const eijiroSearchFullArray = nextProps.eijiro.split("<a")
      const eijiroSplitArray = eijiroSearchFullArray[0]
      const eijiroSplitArray2 = eijiroSplitArray.split("【レベル】")
      const eijiroSplitArray3 = eijiroSplitArray2[0]
      const eijiroArray = eijiroSplitArray3.split("、")
      this.setState({
        eijiroResult: eijiroArray
      })
    }
  }

  render() {
    let weblioComponent, infoseekComponent, eijiroComponent

    if (this.state.weblioResult.length >= 1) {
      weblioComponent = <Result name="weblio" text={this.state.weblioResult} />
    }

    if (this.state.infoseekResult.length >= 1) {
      infoseekComponent = <Result name="infoseek" text={this.state.infoseekResult} />
    }

    if (this.state.eijiroResult.length >= 1) {
      eijiroComponent = <Result name="eijiro" text={this.state.eijiroResult} />

    }
    return (

    <div className="ui three column grid">

      <div className="row">
        {weblioComponent}
        {infoseekComponent}
        {eijiroComponent}
      </div>

    </div>
    );
  }
}

export default Results;
