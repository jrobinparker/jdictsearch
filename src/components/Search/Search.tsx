import { useState, ChangeEvent, MouseEvent } from 'react';
import Icon from '../Icon/Icon';
import { StyledForm, StyledInput } from './Search.styles';

interface SearchProps {
  onTermSubmit: (searchTerm: string) => void;
  handleReload: () => void;
  loading: string;
}

const Search = ({ onTermSubmit, handleReload, loading }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target?.value);
  };

  const onFormSubmit = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    onTermSubmit(searchTerm);
  };

  const clearSearch = (): void => {
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
