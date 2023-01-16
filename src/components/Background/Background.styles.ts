import styled from 'styled-components';

export const StyledBackground = styled.img.attrs({
  className: 'bg',
})`
  height: 100vh;
  width: 100vw;
  background: url('/images/sakura.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: transparent;
  transition: 2s;
`;
