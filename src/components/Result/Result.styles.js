import styled from 'styled-components';

export const StyledResult = styled.div.attrs({
  className: 'result',
})`
  width: 30%;
  border-radius: 5px;
  display: flex;
  align-items: baseline;
  padding: 15px;
  background-color: #bdf2d5;
  color: #5d13e7;
  font-size: 1.5rem;
  border-radius: 5px;
  text-align: center;
  opacity: 0;
  cursor: pointer;

  i {
    margin-left: auto;
  }

  @media only screen and (orientation: portrait) {
    width: 100%;
    margin-bottom: 10px;
  }

  @media only screen and (orientation: landscape) and (max-width: 929px) {
    font-size: 1.9vh;
    width: 25%;
  }

  @media only screen and (orientation: landscape) and (min-width: 930px) and (max-width: 1359px) {
    font-size: 2.25vh;
    width: 25%;
  }

  @media only screen and (orientation: landscape) and (min-width: 1360px) and (max-width: 1500px) {
    font-size: 3vh;
  }
`;
