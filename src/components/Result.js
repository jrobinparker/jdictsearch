import React from 'react';
import '../App.css';

const Result = props => {

  const setButtonStyle = () => {
    const buttonIdNumber = props.buttonId
    const buttonIdTag = document.getElementById(buttonIdNumber)
    buttonIdTag.style.display = 'block'
  }


  return (
    <div className="column">
        <div className="result" onMouseLeave={() => setButtonStyle()}>

          <div className="column-header">
            {props.name}
          </div>

          <div className="result-text">
            <ul>
              {props.text.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
        <div className='view-link' id={props.buttonId}>click here for full definition</div>

    </div>
    )
};

export default Result;
