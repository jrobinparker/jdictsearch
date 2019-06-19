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
          <form onSubmit={this.onFormSubmit} className="input-field" style={{ marginTop: '10%' }}>
              <input type="text" className="input-text" placeholder="enter an english word..." name="searchTerm" value={this.state.searchTerm} onChange={this.onChange} />
          </form>
    )
  }
}

export default Search;
