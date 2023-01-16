import styled from 'styled-components';

export const StyledResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-self: center;
  
  @media only screen and (orientation: portrait) {
    flex-direction: column;
    width: 94%;
  }
`;
