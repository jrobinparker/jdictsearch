import React from 'react';
import gsap from 'gsap';

class NoResults extends React.Component {
  
  componentDidMount() {
      const msg = document.querySelector('.no-results')
      gsap.to(msg, .5, {opacity: 1, y: -5})
  }

  render() {
    return (
      <div className="no-results">
        No results found!
      </div>
    )
  }
}

export default NoResults
