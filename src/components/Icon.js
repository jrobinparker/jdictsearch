import React from 'react';
import gsap from 'gsap';

const Icon = ({ clear, search }) => {

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
    const tl = gsap.timeline()

    tl
      .to(clearIcon, .1, {opacity: 0, visibility: 'hidden'})
      .to(icon, .1, {opacity: 1, visibility: 'visible', className: '-= fas fa-search '})

    clear()
  }

    return (
      <div className="icon-container">
        <i
          className="fas fa-search" id="icon"
          onClick={handleClick}
        />
        <i
          className="fas fa-times"
          id="clear-icon"
          onClick={e => clearSearch()}
        />
      </div>
    )
  }

export default Icon;
