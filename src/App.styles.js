import styled from 'styled-components';

export const StyledContainer = styled.main`
  height: 100vh;
  width: 100vw;
`;

export const StyledUi = styled.div`
  width: 90%;
  height: 35%;
  position: absolute;
  top: 20%;
  left: 5%;
  padding: 5px 20px 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.5);

  @media only screen and (orientation: portrait) {
    top: 20%;
    left: 5%;
    width: 90%;
    height: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const StyledRow = styled.div`
  position: relative;
  top: 30%;
  height: 10%;
  width: 100%;

  @media only screen and (orientation: portrait) {
    height: 5%;
    position: relative;
    top: 30%;
  }
`;
