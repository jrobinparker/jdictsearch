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
  cursor: pointer;
  -webkit-animation: result 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: result 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  :nth-of-type(1) {
        margin-right: 2.2%;
  }

  :nth-of-type(3) {
        margin-left: 2.2%;
  }

  @-webkit-keyframes result {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-100px);
      transform: translateY(-100px);
    }
  }
  @keyframes result {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-100px);
      transform: translateY(-100px);
    }
  }

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
