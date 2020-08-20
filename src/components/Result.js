import React from 'react';
import gsap from 'gsap';

class Result extends React.Component {
  state = {
    viewLink: false
  }

  componentDidMount() {
    this.props.appear()
  }

  showLink = () => {
    this.setState({
      viewLink: true
    })
    const linkButton = document.getElementById(`${this.props.name}`)
    gsap.to(linkButton, .5, {visibility: 'visible', opacity: 1, y: 5})
  }

  hideLink = () => {

    const linkButton = document.getElementById(`${this.props.name}`)
    gsap.to(linkButton, .5, {visibility: 'hidden', opacity: 0, y: -5})
    this.setState({
      viewLink: false
    })
  }


  render() {

  const { name, text, url, length } = this.props

  return (
    <div
      className="result"
      onMouseOver={this.showLink}
      onMouseOut={this.hideLink}>
          {length} results from {name}
        <i className="fas fa-chevron-right"/>
    </div>
    )
}
}

export default Result;
