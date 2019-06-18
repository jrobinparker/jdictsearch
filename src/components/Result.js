import React from 'react';
import '../App.css';

class Result extends React.Component {

  render() {

  return (
    <div className="column">
        <div className="result">
          <div className="column-header">
            {this.props.name}
          </div>
          <div className="result-text">
            <ul>
              {this.props.text.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          </div>
    </div>

    )
  }
};

export default Result;
