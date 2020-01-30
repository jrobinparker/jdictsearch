import React from 'react';
import gsap from 'gsap';

class Search extends React.Component {

  state = {
    searchTerm: ''
  };

  onChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  onFormSubmit = e => {
      e.preventDefault();
      this.searchAnimation();
      this.props.onTermSubmit(this.state.searchTerm);
  }

  searchAnimation = () => {
    const icon = document.getElementById('icon')
    const clear = document.getElementById('clear-icon')
    const results = document.querySelectorAll('.result')
    const searchIconTimeline = gsap.timeline()

    searchIconTimeline
      .to(icon, .1, {className: '-= fas fa-search '})
      .to(icon, .1, {className: '+= fas fa-spinner'})
      .to(icon, {duration: 1, rotate: 360, repeat: 3})
      .to(icon, .5, {opacity: 0, visibility: 'hidden'})
      .to(clear, .5, {opacity: 1, visibility: 'visible'})

  }

  animateIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#bdf2d5'})
  }

  resetIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#f6f6f6'})
  }

  clearAll = () => {
    this.setState({
      searchTerm: ''
    })
    const results = document.querySelectorAll('.result')
    const icon = document.getElementById('icon')
    const clear = document.getElementById('clear-icon')
    const tl = gsap.timeline()

    tl
      .to(clear, .1, {opacity: 0, visibility: 'hidden'})
      .to(icon, .1, {opacity: 1, visibility: 'visible', className: '-= fas fa-search '})

    this.props.handleReload()
  }

  render() {
    return (
          <form onSubmit={this.onFormSubmit}>
              <input type="text" className="input-text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange}
              onFocus={this.animateIcon} onBlur={this.resetIcon}
              />
              <i className="fas fa-search" id="icon"
              onClick={this.onFormSubmit}
              onMouseOver={this.animateIcon}
              onMouseOut={this.resetIcon}
              />
              <i className="fas fa-times" id="clear-icon" onClick={this.clearAll} />
          </form>
    )
  }
}

export default Search;
