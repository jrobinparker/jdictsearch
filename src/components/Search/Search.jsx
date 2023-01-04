import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { StyledForm, StyledInput } from './Search.styles';

const Search = ({ onTermSubmit, handleReload, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onTermSubmit(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    handleReload();
  };

  return (
    <StyledForm>
      <StyledInput
        type="text"
        placeholder="Enter an English word..."
        name="searchTerm"
        value={searchTerm}
        onChange={onChange}
      />
      <Icon search={onFormSubmit} clear={clearSearch} loading={loading} />
    </StyledForm>
  );
};

export default Search;
