import React from 'react';
import gsap from 'gsap';

class Search extends React.Component {

  state = {
    searchTerm: '',
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

  removeResults = () => {
    this.setState({
      searchTerm: ''
    })
    this.props.removeResults()
  }

  searchAnimation = () => {
    const search = document.getElementById('search-icon')
    const spinner = document.getElementById('spinner-icon')
    const searchIconTimeline = gsap.timeline()

    searchIconTimeline.to(search, .1, {visibility: 'hidden'})
      .to(spinner, .1, {visibility: 'visible'})
      .to(spinner, {duration: 1, rotate: 360, repeat: 3})
      .to(spinner, .1, {visibility: 'hidden'})
      .to(search, .1, {visibility: 'visible'})
  }

  animateIcon = () => {
    const icon = document.getElementById("search-icon")
    gsap.to(icon, .5, {backgroundColor: '#bdf2d5'})
  }

  resetIcon = () => {
    const icon = document.getElementById("search-icon")
    gsap.to(icon, .5, {backgroundColor: '#f6f6f6'})
  }

  render() {
    return (
          <form onSubmit={this.onFormSubmit}>
              <input type="text" className="input-text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange}
              onFocus={this.animateIcon} onBlur={this.resetIcon}
              />
              <i className="fas fa-search" id="search-icon" onClick={this.onFormSubmit}
              onMouseOver={this.animateIcon}
              onMouseOut={this.resetIcon}
              />
              <i className="fas fa-spinner" id="spinner-icon" />
          </form>
    )
  }
}

export default Search;
