import React from 'react';
import gsap from 'gsap';

class Search extends React.Component {

  state = {
    searchTerm: '',
    searched: false
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
    const icon = document.getElementById('icon')
    const searchIconTimeline = gsap.timeline()

    searchIconTimeline
      .to(icon, .1, {className: '-= fas fa-search '})
      .to(icon, .1, {className: '+= fas fa-spinner'})
      .to(icon, {duration: 1, rotate: 360, repeat: 3})
      .to(icon, .1, {className: '-= fas fa-spinner'})
      .to(icon, .1, {className: '+= fas fa-search '})
  }

  animateIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#bdf2d5'})
  }

  resetIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#f6f6f6'})
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
          </form>
    )
  }
}

export default Search;
