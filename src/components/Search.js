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
      <div>
        <h1>JDictSearch</h1>
        <h3>the english-japanese search aggregator</h3>
        <form onSubmit={this.onFormSubmit} className="ui form" style={{ marginBottom: '20px' }}>
              <input className="prompt" type="text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange} />
        </form>
      </div>
    )
  }
}

export default Search;
