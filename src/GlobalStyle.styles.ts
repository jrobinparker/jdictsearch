import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        color: black;
        font-family: "Alata", sans-serif;
        margin: 0 auto;
        overflow-y: hidden;
        overflow-x: hidden;
    }

    ul {
        list-style-type: none;
        padding-bottom: 5px;
    }

    li {
        margin-left: -35px;
        margin-bottom: 10px;
        padding: 0px 10px 0px 10px;
    }
    `;
