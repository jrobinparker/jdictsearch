import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 100%;
  display: flex;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  color: black;
  border: 0px;
  font-size: 3vh;
  font-family: 'Alata', sans-serif;

  &::placeholder {
    color: black;
  }
`;
