import React from 'react';
import '../App.css';

const Result = props => {

  const { buttonId, name, text, url } = props

  const setButtonStyle = () => {
    const buttonIdNumber = buttonId
    const buttonIdTag = document.getElementById(buttonIdNumber)
    buttonIdTag.style.display = 'block'
  }


  return (
    <div className="column">
        <div className="result" onMouseLeave={() => setButtonStyle()}>

          <div className="column-header">
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
        <div className="view-link" id={props.buttonId}><a href={url} target="_blank" rel="noopener noreferrer">click here for full definition</a></div>
    </div>
    )
};

export default Result;
