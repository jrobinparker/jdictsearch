import React from 'react';
import gsap from 'gsap';

class Icon extends React.Component {

  searchAnimation = () => {
    const icon = document.getElementById('icon')
    const clear = document.getElementById('clear-icon')
    const arrow = document.querySelector('.arrow-container')
    const tl = gsap.timeline()

    tl
      .to(icon, .1, {className: '-= fas fa-search'})
      .to(icon, 4, {className: '+= fas fa-spinner spin-animation'})
      .to(icon, .5, {opacity: 0, visibility: 'hidden'})
      .to(clear, .5, {opacity: 1, visibility: 'visible'})

    if (window.innerWidth < 680) {
      tl.to(arrow, .5, {visibility: 'visible', opacity: 1})
    }
  }

  handleClick = e => {
    this.searchAnimation()
    this.props.search(e)
  }

  clearSearch = () => {
    const results = document.querySelectorAll('.result')
    const icon = document.getElementById('icon')
    const clear = document.getElementById('clear-icon')
    const arrow = document.querySelector('.arrow-container')
    const tl = gsap.timeline()

    tl
      .to(clear, .1, {opacity: 0, visibility: 'hidden'})
      .to(icon, .1, {opacity: 1, visibility: 'visible', className: '-= fas fa-search '})

    if (window.innerWidth < 680) {
      tl.to(arrow, .5, {visibility: 'hidden', opacity: 0})
    }

    this.props.clear()
  }

  render() {

    return (
      <React.Fragment>
        <i
          className="fas fa-search" id="icon"
          onClick={this.handleClick}
          onMouseOver={this.props.animate}
          onMouseOut={this.props.reset}
        />
        <i
          className="fas fa-times"
          id="clear-icon"
          onClick={this.clearSearch}
        />
      </React.Fragment>
    )
  }
}

export default Icon
