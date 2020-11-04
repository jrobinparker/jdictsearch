import React, { useState } from 'react';
import gsap from 'gsap';
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

  const animateIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#bdf2d5'})
  }

  const resetIcon = () => {
    const icon = document.getElementById("icon")
    gsap.to(icon, .5, {backgroundColor: '#f6f6f6'})
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
                placeholder="enter an english word..."
                name="searchTerm"
                value={searchTerm}
                onChange={onChange}
                onFocus={animateIcon}
                onBlur={resetIcon}
                onSubmit={onFormSubmit}
                id="search-form"
              />
              <Icon
                search={onFormSubmit}
                clear={clearSearch}
                animate={animateIcon}
                reset={resetIcon}
              />
          </form>
    )
  }

export default Search;
