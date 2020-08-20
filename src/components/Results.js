import React from 'react';
import Result from './Result';
import gsap from 'gsap';

class Results extends React.Component {
  state = {
    weblioResult: [],
    infoseekResult: [],
    eijiroResult: [],
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
  }

  componentWillMount() {
    console.log('mounting results component')
    const results = document.querySelectorAll('.results-grid')
    gsap.to(results, .5, {opacity: 1, y: -5})
  }

  toggleOnResize = () => {
    const results = document.querySelector('.results-grid')

    if (window.innerWidth > 650) {
      gsap.to(results, .5, {visibility: 'visible', opacity: 1})
    }
  }

  render() {

    let weblioComponent, infoseekComponent, eijiroComponent

    const { term, showResults } = this.props

    if (this.state.weblioResult.length >= 1) {
      weblioComponent =
        <Result
          name="weblio"
          url={`https://ejje.weblio.jp/content/${term}`}
          length={this.state.weblioResult.length}
          text={this.state.weblioResult}
          appear={showResults}
        />
    }

    if (this.state.infoseekResult.length >= 1) {
      infoseekComponent =
        <Result
          name="infoseek"
          url={`http://dictionary.infoseek.ne.jp/ejword/${term}`}
          length={this.state.infoseekResult.length}
          text={this.state.infoseekResult}
          appear={showResults}
        />
    }

    if (this.state.eijiroResult.length >= 1) {
      eijiroComponent =
        <Result
          name="eijiro"
          url={`https://eow.alc.co.jp/search?q=${term}&ref=sa`}
          length={this.state.eijiroResult.length}
          text={this.state.eijiroResult}
          appear={showResults}
        />
    }

    window.addEventListener('resize', () => {
      this.toggleOnResize()
    }, false)

    return (
      <div className="results">
          {weblioComponent}
          {infoseekComponent}
          {eijiroComponent}
      </div>
    )
  }
}

export default Results;
