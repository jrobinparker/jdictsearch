import React, { Fragment } from 'react';
import gsap from 'gsap';
import ResultModal from './ResultModal';

class Result extends React.Component {
  state = {
    viewLink: false,
    showModal: false
  }

  componentDidMount() {
    this.props.appear()
  }

  toggleModal = e => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {

  const { name, text, url, length, term } = this.props

  return (
    <Fragment>
      <div
        className="result"
        onMouseOver={this.showLink}
        onMouseOut={this.hideLink}
        onClick={e => this.toggleModal(e)}
        >
            {length} results from {name}
          <i className="fas fa-chevron-right" onClick={e => this.toggleModal(e)}/>
      </div>
      {this.state.showModal === true ? <ResultModal closeModal={this.toggleModal} text={text} name={name} url={url} length={length} term={term} /> : <Fragment></Fragment>}
    </Fragment>
    )
}
}

export default Result;
