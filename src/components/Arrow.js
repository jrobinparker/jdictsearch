import React from 'react';
import gsap from 'gsap';

class Arrow extends React.Component {
  state = {
    arrow: 'down'
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.display === true) {
      const arrow = document.querySelector('.arrow-container')
      gsap.to(arrow, .5, {visibility: 'visible', opacity: 1})
    }
  }

  toggleDisplay = () => {
    const arrow = document.querySelector('.arrow-container')
    if (window.innerWidth > 650) {
      gsap.to(arrow, .5, {visibility: 'hidden', opacity: 0})
    } else {
      gsap.to(arrow, .5, {visibility: 'visible', opacity: 1})
    }
  }

  render() {
    window.addEventListener('resize', () => {
      this.toggleDisplay()
    }, false)

    return (
        <div className="arrow-container"
          onMouseOver={() => {
            const arrow = document.getElementById('arrow')
            gsap.to(arrow, .5, {backgroundColor: '#bdf2d5'})}
          }

          onMouseOut={() => {
            const arrow = document.getElementById('arrow')
            gsap.to(arrow, .5, {backgroundColor: '#f6f6f6'})}
          }
        >
          {this.state.arrow === 'down' ? (
            <div>
              <i
                className="fas fa-chevron-down"
                id="arrow"
                onClick={() => {
                  const results = document.querySelector('.results-grid')
                  results.scrollIntoView({behavior: 'smooth'})
                  gsap.to(results, .5, {opacity: 1})
                  this.setState({
                    arrow: 'up'
                  })
                }}/>
                <div className="arrow-text">view results</div>
              </div>
          ) : (
            <div>
              <i
                className="fas fa-chevron-up"
                id="arrow"
                onClick={() => {
                  const top = document.querySelector('.container')
                  top.scrollIntoView({behavior: 'smooth'})
                  const results = document.querySelector('.results-grid')
                  gsap.to(results, .5, {opacity: 0})
                  this.setState({
                    arrow: 'down'
                  })
                }}/>
                <div className="arrow-text">return to search</div>
              </div>
          )}
      </div>
    )
  }
}

export default Arrow;
