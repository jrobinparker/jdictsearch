import React from 'react';
import gsap from 'gsap';

class Result extends React.Component {
  state = {
    loaded: false,
    text: ''
  }

  appear = () => {
    const columnName = this.props.columnName
    const column = document.getElementById(columnName)
    gsap.to(column, .5, {opacity: 1, y: -5})
  }

  disappear = () => {
    const columnName = this.props.columnName
    const column = document.getElementById(columnName)
    gsap.to(column, .5, {opacity: 0, y: 5})
  }

  componentDidMount() {
    this.appear()
  }

  render() {

  const { buttonId, name, text, url, columnName } = this.props

  const setButtonStyle = () => {
    const buttonIdNumber = buttonId
    const buttonIdTag = document.getElementById(buttonIdNumber)
    buttonIdTag.style.display = 'block'
  }

  return (
    <div className="result-column">
        <div className="result" onMouseLeave={() => setButtonStyle()} id={`${columnName}`}>

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
        <div className="view-link" id={buttonId}><a href={url} target="_blank" rel="noopener noreferrer">click here for full definition</a></div>
    </div>
    )
}
}

export default Result;
