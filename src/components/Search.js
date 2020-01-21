import React from 'react';

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
    this.props.onTermSubmit(this.state.searchTerm);
  }

  removeResults = () => {
    this.setState({
      searchTerm: ''
    })
    this.props.removeResults()
  }

  render() {
    return (
          <form onSubmit={this.onFormSubmit}>
              <input type="text" className="input-text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange} />
              <i className="fas fa-search" id="search-icon" onClick={this.removeResults} />
          </form>
    )
  }
}

export default Search;
