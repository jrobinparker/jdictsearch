import styled from 'styled-components';

interface StyledIconProps {
  displayIcon: string;
}

export const StyledIconContainer = styled.div`
  height: 100%;
  width: 10%;
  padding: 25px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  &:hover {
    background: #bdf2d5;
  }

  @media only screen and (orientation: portrait) {
    width: 15%;
    padding: 15px;
  }
`;

export const StyledIcon = styled.i.attrs((props: StyledIconProps) => ({
  className: `fas ${props.displayIcon}`,
}))<StyledIconProps>`
  font-size: 4vh;
  color: #5d13e7;
`;
