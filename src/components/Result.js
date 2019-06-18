import React from 'react';
import '../App.css';

const Result = props => {

  return (
    <div className="column">
        <div className="result">
          <div className="column-header">
            {props.name}
          </div>
          <div className="result-text">
            <ul>
              {props.text.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          </div>
    </div>

    )
};

export default Result;
