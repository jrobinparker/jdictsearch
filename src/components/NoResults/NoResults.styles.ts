import styled from 'styled-components';

export const StyledNoResults = styled.div.attrs({
  className: 'no-results',
})`
  opacity: 0;
  position: relative;
  left: 30%;
  margin-top: 5%;
  width: 45%;
  padding: 15px;
  background-color: #bdf2d5;
  color: #5d13e7;
  font-size: 1.5rem;
  border-radius: 5px;
  text-align: center;
`;
