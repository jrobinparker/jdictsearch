import React, { useState } from 'react';
import Icon from './Icon.js';

const Search = ({ onTermSubmit, handleReload }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = e => {
    setSearchTerm(e.target.value)
  }

  const onFormSubmit = e => {
      e.preventDefault();
      onTermSubmit(searchTerm);
  }

  const clearSearch = () => {
    setSearchTerm('')
    handleReload()
  }

  return (
          <form onSubmit={onFormSubmit}>
              <input
                type="text"
                className="input-text"
                placeholder="Enter an english word..."
                name="searchTerm"
                value={searchTerm}
                onChange={onChange}
                onSubmit={onFormSubmit}
              />
              <Icon
                search={onFormSubmit}
                clear={clearSearch}
              />
          </form>
    )
  }

export default Search;
