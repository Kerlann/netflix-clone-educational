import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #000;
    color: #fff;
    line-height: 1.5;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
  }

  ul, ol {
    list-style: none;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #141414;
  }

  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e50914;
  }
`;

export default GlobalStyles;