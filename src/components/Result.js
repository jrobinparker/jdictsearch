import React from 'react';
import gsap from 'gsap';

class Result extends React.Component {

  componentDidMount() {
    this.props.appear()
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
        <div className="result" id={`${columnName}`}>

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
    </div>
    )
}
}

export default Result;
