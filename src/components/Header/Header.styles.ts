import styled from 'styled-components';

export const StyledHeader = styled.header`
  width: 50%;
  color: white;
  margin-bottom: 20px;

  @media only screen and (orientation: portrait) {
    width: 100%;
    margin-bottom: 0px;
  }
`;

export const StyledHeaderMainText = styled.div`
  font-size: 7vh;

  @media only screen and (orientation: portrait) {
    font-size: 4vh;
  }
`;

export const StyledHeaderSubText = styled.div`
  font-size: 3vh;

  @media only screen and (orientation: portrait) {
    font-size: 2.25vh;
  }
`;
