import React from 'react';
import gsap from 'gsap';
import Icon from './Icon.js';

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
      this.props.onTermSubmit(this.state.searchTerm);
  }

  animateIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#bdf2d5'})
  }

  resetIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#f6f6f6'})
  }

  clearSearch = () => {
    this.setState({
      searchTerm: ''
    })
    this.props.handleReload()
  }

  render() {
    return (
          <form onSubmit={this.onFormSubmit}>
              <input
                type="text"
                className="input-text"
                placeholder="enter an english word..."
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.onChange}
                onFocus={this.animateIcon}
                onBlur={this.resetIcon}
                id="search-form"
              />
              <Icon
                search={this.onFormSubmit}
                clear={this.clearSearch}
                animate={this.animateIcon}
                reset={this.resetIcon}
              />
          </form>
    )
  }
}

export default Search;
