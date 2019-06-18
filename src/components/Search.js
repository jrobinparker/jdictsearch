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

  render() {
    return (
      <div className="search-bar ui segment">
        <h1 className="ui center aligned header">JDictSearch</h1>
        <h4 className="ui center aligned header" style={{ marginBottom: '20px' }}>the english-japanese search aggregator</h4>
        <form onSubmit={this.onFormSubmit} className="ui form">
              <input className="prompt" type="text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange} className="field" />
        </form>
      </div>
    )
  }
}

export default Search;
