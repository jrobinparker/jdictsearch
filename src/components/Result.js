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

  const { buttonId, name, text, url, columnName } = this.props

  const setButtonStyle = () => {
    const buttonIdNumber = buttonId
    const buttonIdTag = document.getElementById(buttonIdNumber)
    buttonIdTag.style.display = 'block'
  }

  return (
    <div
      className="result-column"
      onMouseOver={this.showLink}
      onMouseOut={this.hideLink}>
        <div className="result">

          <div className="result-header">
            {name}
          </div>

          <div className="result-text">
            <ul>
              {text.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
        {this.state.viewLink ? (
            <div className="view-link" id={`${name}`}>
              <a href={url} target="_blank" rel="noopener noreferrer">see all translations</a>
            </div>
        ) : (
          <div className="view-link" style={{ visibility: 'hidden' }} id={`${name}`}>
            <a href={url} target="_blank" rel="noopener noreferrer">see all translations</a>
          </div>
        )}

    </div>
    )
}
}

export default Result;
