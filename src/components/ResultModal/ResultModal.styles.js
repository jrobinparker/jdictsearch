import styled from 'styled-components';

export const StyledResultModal = styled.div`
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.9);
`;

export const StyledResultModalCard = styled.div`
    position: relative;
    top: 20%;
    left: 15%;
    max-height: 80vh;
    width: 70%;
    background-color: white;
    border-radius: 5px;
    color: #5d13e7;
    padding: 2%;
    box-shadow: 12px 12px 12px 0 rgba(0, 0, 0, 0.3);

    @media only screen and (orientation: portrait) {
          left: 5%;
          width: 85%;
    }
`;

export const StyledResultModalCardHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    font-size: 4vh;
    width: 100%;
    margin-bottom: 2.5%;
`;

export const StyledResultModalCardBody = styled.div`
    max-height: 50vh;
    overflow-y: scroll;
    font-size: 3vh;
`;

export const StyledResultModalClose = styled.i.attrs({
    className: `fas fa-times`,
})`
    margin-left: auto;
    cursor: pointer;
`;