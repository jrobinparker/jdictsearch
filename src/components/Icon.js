import React, { Fragment } from 'react';
import gsap from 'gsap';

const Icon = ({ animate, clear, reset, search }) => {

  const searchAnimation = () => {
    const icon = document.getElementById('icon')
    const clear = document.getElementById('clear-icon')
    const tl = gsap.timeline()

    tl
      .to(icon, .1, {className: '-= fas fa-search'})
      .to(icon, 4, {className: '+= fas fa-spinner spin-animation'})
      .to(icon, .5, {opacity: 0, visibility: 'hidden'})
      .to(clear, .5, {opacity: 1, visibility: 'visible'})

  }

  const handleClick = e => {
    searchAnimation()
    search(e)
  }

  const clearSearch = () => {
    const icon = document.getElementById('icon')
    const clearIcon = document.getElementById('clear-icon')
    const arrow = document.querySelector('.arrow-container')
    const tl = gsap.timeline()

    tl
      .to(clearIcon, .1, {opacity: 0, visibility: 'hidden'})
      .to(icon, .1, {opacity: 1, visibility: 'visible', className: '-= fas fa-search '})

    clear()
  }

    return (
      <Fragment>
        <i
          className="fas fa-search" id="icon"
          onClick={handleClick}
          onMouseOver={animate}
          onMouseOut={reset}
        />
        <i
          className="fas fa-times"
          id="clear-icon"
          onClick={e => clearSearch()}
        />
      </Fragment>
    )
  }

export default Icon;
